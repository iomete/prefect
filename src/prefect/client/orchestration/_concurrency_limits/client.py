from __future__ import annotations

from typing import TYPE_CHECKING, Any

from httpx import HTTPStatusError, RequestError

from prefect.client.orchestration.base import BaseAsyncClient, BaseClient
from prefect.exceptions import ObjectNotFound

if TYPE_CHECKING:
    from uuid import UUID

    from httpx import Response

    from prefect.client.schemas.actions import ConcurrencyLimitCreate
    from prefect.client.schemas.objects import ConcurrencyLimit


class ConcurrencyLimitClient(BaseClient):
    def create_concurrency_limit(
        self,
        tag: str,
        concurrency_limit: int,
    ) -> "UUID":
        """
        Create a tag concurrency limit in the Prefect API. These limits govern concurrently
        running tasks.

        Args:
            tag: a tag the concurrency limit is applied to
            concurrency_limit: the maximum number of concurrent task runs for a given tag

        Raises:
            httpx.RequestError: if the concurrency limit was not created for any reason

        Returns:
            the ID of the concurrency limit in the backend
        """

        concurrency_limit_create = ConcurrencyLimitCreate(
            tag=tag,
            concurrency_limit=concurrency_limit,
        )
        response = self.request(
            "POST",
            "/concurrency_limits/",
            json=concurrency_limit_create.model_dump(mode="json"),
        )

        concurrency_limit_id = response.json().get("id")

        if not concurrency_limit_id:
            raise RequestError(f"Malformed response: {response}")
        from uuid import UUID

        return UUID(concurrency_limit_id)

    def read_concurrency_limit_by_tag(
        self,
        tag: str,
    ) -> "ConcurrencyLimit":
        """
        Read the concurrency limit set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: if the concurrency limit was not created for any reason

        Returns:
            the concurrency limit set on a specific tag
        """
        try:
            response = self.request(
                "GET",
                "/concurrency_limits/tag/{tag}",
                path_params={"tag": tag},
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

        concurrency_limit_id = response.json().get("id")

        if not concurrency_limit_id:
            raise RequestError(f"Malformed response: {response}")
        from prefect.client.schemas.objects import ConcurrencyLimit

        return ConcurrencyLimit.model_validate(response.json())

    def read_concurrency_limits(
        self,
        limit: int,
        offset: int,
    ) -> list["ConcurrencyLimit"]:
        """
        Lists concurrency limits set on task run tags.

        Args:
            limit: the maximum number of concurrency limits returned
            offset: the concurrency limit query offset

        Returns:
            a list of concurrency limits
        """

        body = {
            "limit": limit,
            "offset": offset,
        }

        response = self.request("POST", "/concurrency_limits/filter", json=body)
        from prefect.client.schemas.objects import ConcurrencyLimit

        return ConcurrencyLimit.model_validate_list(response.json())

    def reset_concurrency_limit_by_tag(
        self,
        tag: str,
        slot_override: list["UUID | str"] | None = None,
    ) -> None:
        """
        Resets the concurrency limit slots set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to
            slot_override: a list of task run IDs that are currently using a
                concurrency slot, please check that any task run IDs included in
                `slot_override` are currently running, otherwise those concurrency
                slots will never be released.

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: If request fails

        """
        if slot_override is not None:
            slot_override = [str(slot) for slot in slot_override]

        try:
            self.request(
                "POST",
                "/concurrency_limits/tag/{tag}/reset",
                path_params={"tag": tag},
                json=dict(slot_override=slot_override),
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

    def delete_concurrency_limit_by_tag(
        self,
        tag: str,
    ) -> None:
        """
        Delete the concurrency limit set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: If request fails

        """
        try:
            self.request(
                "DELETE",
                "/concurrency_limits/tag/{tag}",
                path_params={"tag": tag},
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

    def increment_v1_concurrency_slots(
        self,
        names: list[str],
        task_run_id: "UUID",
    ) -> "Response":
        """
        Increment concurrency limit slots for the specified limits.

        Args:
            names (List[str]): A list of limit names for which to increment limits.
            task_run_id (UUID): The task run ID incrementing the limits.
        """
        data: dict[str, Any] = {
            "names": names,
            "task_run_id": str(task_run_id),
        }

        return self.request(
            "POST",
            "/concurrency_limits/increment",
            json=data,
        )

    def decrement_v1_concurrency_slots(
        self,
        names: list[str],
        task_run_id: "UUID",
        occupancy_seconds: float,
    ) -> "Response":
        """
        Decrement concurrency limit slots for the specified limits.

        Args:
            names (List[str]): A list of limit names to decrement.
            task_run_id (UUID): The task run ID that incremented the limits.
            occupancy_seconds (float): The duration in seconds that the limits
                were held.

        Returns:
            httpx.Response: The HTTP response from the server.
        """
        data: dict[str, Any] = {
            "names": names,
            "task_run_id": str(task_run_id),
            "occupancy_seconds": occupancy_seconds,
        }

        return self.request(
            "POST",
            "/concurrency_limits/decrement",
            json=data,
        )


class ConcurrencyLimitAsyncClient(BaseAsyncClient):
    async def create_concurrency_limit(
        self,
        tag: str,
        concurrency_limit: int,
    ) -> "UUID":
        """
        Create a tag concurrency limit in the Prefect API. These limits govern concurrently
        running tasks.

        Args:
            tag: a tag the concurrency limit is applied to
            concurrency_limit: the maximum number of concurrent task runs for a given tag

        Raises:
            httpx.RequestError: if the concurrency limit was not created for any reason

        Returns:
            the ID of the concurrency limit in the backend
        """

        concurrency_limit_create = ConcurrencyLimitCreate(
            tag=tag,
            concurrency_limit=concurrency_limit,
        )
        response = await self.request(
            "POST",
            "/concurrency_limits/",
            json=concurrency_limit_create.model_dump(mode="json"),
        )

        concurrency_limit_id = response.json().get("id")

        if not concurrency_limit_id:
            raise RequestError(f"Malformed response: {response}")
        from uuid import UUID

        return UUID(concurrency_limit_id)

    async def read_concurrency_limit_by_tag(
        self,
        tag: str,
    ) -> "ConcurrencyLimit":
        """
        Read the concurrency limit set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: if the concurrency limit was not created for any reason

        Returns:
            the concurrency limit set on a specific tag
        """
        try:
            response = await self.request(
                "GET",
                "/concurrency_limits/tag/{tag}",
                path_params={"tag": tag},
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

        concurrency_limit_id = response.json().get("id")

        if not concurrency_limit_id:
            raise RequestError(f"Malformed response: {response}")
        from prefect.client.schemas.objects import ConcurrencyLimit

        return ConcurrencyLimit.model_validate(response.json())

    async def read_concurrency_limits(
        self,
        limit: int,
        offset: int,
    ) -> list["ConcurrencyLimit"]:
        """
        Lists concurrency limits set on task run tags.

        Args:
            limit: the maximum number of concurrency limits returned
            offset: the concurrency limit query offset

        Returns:
            a list of concurrency limits
        """

        body = {
            "limit": limit,
            "offset": offset,
        }

        response = await self.request("POST", "/concurrency_limits/filter", json=body)
        from prefect.client.schemas.objects import ConcurrencyLimit

        return ConcurrencyLimit.model_validate_list(response.json())

    async def reset_concurrency_limit_by_tag(
        self,
        tag: str,
        slot_override: list["UUID | str"] | None = None,
    ) -> None:
        """
        Resets the concurrency limit slots set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to
            slot_override: a list of task run IDs that are currently using a
                concurrency slot, please check that any task run IDs included in
                `slot_override` are currently running, otherwise those concurrency
                slots will never be released.

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: If request fails

        """
        if slot_override is not None:
            slot_override = [str(slot) for slot in slot_override]

        try:
            await self.request(
                "POST",
                "/concurrency_limits/tag/{tag}/reset",
                path_params={"tag": tag},
                json=dict(slot_override=slot_override),
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

    async def delete_concurrency_limit_by_tag(
        self,
        tag: str,
    ) -> None:
        """
        Delete the concurrency limit set on a specific tag.

        Args:
            tag: a tag the concurrency limit is applied to

        Raises:
            prefect.exceptions.ObjectNotFound: If request returns 404
            httpx.RequestError: If request fails

        """
        try:
            await self.request(
                "DELETE",
                "/concurrency_limits/tag/{tag}",
                path_params={"tag": tag},
            )
        except HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ObjectNotFound(http_exc=e) from e
            else:
                raise

    async def increment_v1_concurrency_slots(
        self,
        names: list[str],
        task_run_id: "UUID",
    ) -> "Response":
        """
        Increment concurrency limit slots for the specified limits.

        Args:
            names (List[str]): A list of limit names for which to increment limits.
            task_run_id (UUID): The task run ID incrementing the limits.
        """
        data: dict[str, Any] = {
            "names": names,
            "task_run_id": str(task_run_id),
        }

        return await self.request(
            "POST",
            "/concurrency_limits/increment",
            json=data,
        )

    async def decrement_v1_concurrency_slots(
        self,
        names: list[str],
        task_run_id: "UUID",
        occupancy_seconds: float,
    ) -> "Response":
        """
        Decrement concurrency limit slots for the specified limits.

        Args:
            names (List[str]): A list of limit names to decrement.
            task_run_id (UUID): The task run ID that incremented the limits.
            occupancy_seconds (float): The duration in seconds that the limits
                were held.

        Returns:
            httpx.Response: The HTTP response from the server.
        """
        data: dict[str, Any] = {
            "names": names,
            "task_run_id": str(task_run_id),
            "occupancy_seconds": occupancy_seconds,
        }

        return await self.request(
            "POST",
            "/concurrency_limits/decrement",
            json=data,
        )
