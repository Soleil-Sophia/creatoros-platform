import { LaunchOSWorkflow } from '../components/launchos/LaunchOSWorkflow';

/**
 * Thin route-level page for the LaunchOS workflow.
 *
 * Domain logic, persistence, and workflow state remain owned by the
 * LaunchOS component and `src/app/lib/launchos/**`.
 */
export function LaunchOSAppPage() {
  return <LaunchOSWorkflow />;
}
