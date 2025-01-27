import type { Automation } from "@/api/automations";
import type { Deployment } from "@/api/deployments";
import { Icon } from "@/components/ui/icons";
import { createFakeDeployment } from "@/mocks";
import { pluralize } from "@/utils";
import { Link } from "@tanstack/react-router";
import humanizeDuration from "humanize-duration";

export type AutomationTrigger = Extract<
	Automation["trigger"],
	{ type: "event" }
>;

const AUTOMATION_TRIGGER_EVENT_POSTURE_LABEL = {
	Proactive: "stays in",
	Reactive: "enters",
} as const;

const DEPLOMYNET_STATUS_LABELS = {
	not_ready: "not ready",
	ready: "ready",
	disabled: "disabled",
} as const;

const getIsAnyDeployment = (trigger: AutomationTrigger) => {
	return trigger.match?.["prefect.resource.id"] === "prefect.deployment.*";
};

const DeploymentsList = ({
	deployments,
}: { deployments: Array<Deployment> }) => {
	return (
		<div className="flex gap-2">
			<div>{pluralize(deployments.length, "deployment")}</div>
			{deployments.map((deployment, i) => {
				return (
					<div key={deployment.id} className="flex items-center gap-1">
						<Link
							className="text-xs flex items-center"
							to="/deployments/deployment/$id"
							params={{ id: deployment.id }}
						>
							<Icon id="Rocket" className="h-4 w-4 mr-1" />
							{deployment.name}
						</Link>
						{i < deployments.length - 1 && <div>or</div>}
					</div>
				);
			})}
		</div>
	);
};

export const DeploymentTriggerDetails = ({
	trigger,
}: { trigger: AutomationTrigger }) => {
	const status = "not_ready"; // TODO
	return (
		<div className="flex items-center gap-1 text-sm">
			When{" "}
			{getIsAnyDeployment(trigger) ? (
				"any deployment"
			) : (
				<DeploymentsList
					deployments={[
						createFakeDeployment(),
						createFakeDeployment(),
						createFakeDeployment(),
					]}
				/>
			)}{" "}
			{AUTOMATION_TRIGGER_EVENT_POSTURE_LABEL[trigger.posture]}{" "}
			{DEPLOMYNET_STATUS_LABELS[status]}
			{trigger.posture === "Proactive"
				? ` for ${humanizeDuration(trigger.within * 1_000)}`
				: null}
		</div>
	);
};
