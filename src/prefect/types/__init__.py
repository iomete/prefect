from typing import Optional, Union
from functools import partial
from typing import Annotated, Any, TypeVar
from typing_extensions import Literal
import orjson
import pydantic
from pydantic import (
    BeforeValidator,
    Field,
    StrictBool,
    StrictFloat,
    StrictInt,
    StrictStr,
    TypeAdapter,
)

from prefect.types._datetime import Date, Duration, DateTime, TimeZone

T = TypeVar("T")

MAX_VARIABLE_NAME_LENGTH = 255
MAX_VARIABLE_VALUE_LENGTH = 5000

NonNegativeInteger = Annotated[int, Field(ge=0)]
PositiveInteger = Annotated[int, Field(gt=0)]
NonNegativeFloat = Annotated[float, Field(ge=0.0)]


BANNED_CHARACTERS = ["/", "%", "&", ">", "<"]

WITHOUT_BANNED_CHARACTERS = r"^[^" + "".join(BANNED_CHARACTERS) + "]+$"
Name = Annotated[str, Field(pattern=WITHOUT_BANNED_CHARACTERS)]

WITHOUT_BANNED_CHARACTERS_EMPTY_OK = r"^[^" + "".join(BANNED_CHARACTERS) + "]*$"
NameOrEmpty = Annotated[str, Field(pattern=WITHOUT_BANNED_CHARACTERS_EMPTY_OK)]


def non_emptyish(value: str) -> str:
    if not value.strip("' \""):
        raise ValueError("name cannot be an empty string")

    return value


NonEmptyishName = Annotated[
    str,
    Field(pattern=WITHOUT_BANNED_CHARACTERS),
    BeforeValidator(non_emptyish),
]


VariableValue = Union[
    StrictStr, StrictInt, StrictBool, StrictFloat, None, dict[str, Any], list[Any]
]


def check_variable_value(value: object) -> object:
    try:
        json_string = orjson.dumps(value)
    except orjson.JSONEncodeError:
        raise ValueError("Variable value must be serializable to JSON")

    if value is not None and len(json_string) > MAX_VARIABLE_VALUE_LENGTH:
        raise ValueError(
            f"Variable value must be less than {MAX_VARIABLE_VALUE_LENGTH} characters"
        )
    return value


StrictVariableValue = Annotated[VariableValue, BeforeValidator(check_variable_value)]

LaxUrl = Annotated[str, BeforeValidator(lambda x: str(x).strip())]

StatusCode = Annotated[int, Field(ge=100, le=599)]


def cast_none_to_empty_dict(value: Any) -> dict[str, Any]:
    if value is None:
        return {}
    return value


KeyValueLabels = Annotated[
    dict[str, Union[StrictBool, StrictInt, StrictFloat, str]],
    BeforeValidator(cast_none_to_empty_dict),
]


ListOfNonEmptyStrings = Annotated[
    list[str], BeforeValidator(lambda x: [s for s in x if s.strip()])
]


class SecretDict(pydantic.Secret[dict[str, Any]]):
    pass


def validate_set_T_from_delim_string(
    value: Union[str, T, set[T], None],
    type_: Any,
    delim: Optional[str] = None,
) -> set[T]:
    """
    "no-info" before validator useful in scooping env vars

    e.g. `PREFECT_CLIENT_RETRY_EXTRA_CODES=429,502,503` -> `{429, 502, 503}`
    e.g. `PREFECT_CLIENT_RETRY_EXTRA_CODES=429` -> `{429}`
    """
    if not value:
        return set()

    T_adapter = TypeAdapter(type_)
    delim = delim or ","
    if isinstance(value, str):
        return {T_adapter.validate_strings(s.strip()) for s in value.split(delim)}
    errors: list[pydantic.ValidationError] = []
    try:
        return {T_adapter.validate_python(value)}
    except pydantic.ValidationError as e:
        errors.append(e)
    try:
        return TypeAdapter(set[type_]).validate_python(value)
    except pydantic.ValidationError as e:
        errors.append(e)
    raise ValueError(f"Invalid set[{type_}]: {errors}")


ClientRetryExtraCodes = Annotated[
    Union[str, StatusCode, set[StatusCode], None],
    BeforeValidator(partial(validate_set_T_from_delim_string, type_=StatusCode)),
]

LogLevel = Annotated[
    Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"],
    BeforeValidator(lambda x: x.upper()),
]


def convert_none_to_empty_dict(v: Union[KeyValueLabels, None]) -> KeyValueLabels:
    return v or {}


KeyValueLabelsField = Annotated[
    KeyValueLabels,
    Field(
        default_factory=dict,
        description="A dictionary of key-value labels. Values can be strings, numbers, or booleans.",
        examples=[{"key": "value1", "key2": 42}],
    ),
    BeforeValidator(convert_none_to_empty_dict),
]


__all__ = [
    "ClientRetryExtraCodes",
    "DateTime",
    "Date",
    "Duration",
    "LogLevel",
    "KeyValueLabelsField",
    "NonNegativeInteger",
    "PositiveInteger",
    "ListOfNonEmptyStrings",
    "NonNegativeFloat",
    "Name",
    "NameOrEmpty",
    "NonEmptyishName",
    "SecretDict",
    "StatusCode",
    "StrictVariableValue",
    "TimeZone",
]
