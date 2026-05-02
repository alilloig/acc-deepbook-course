import { spawn } from 'node:child_process';
import type { ProbeResult, ShellAction, ProbeOptions } from '../preflight.js';
import type { PreflightDeployPreconditionFailedWarning, PreflightDeployTimeoutWarning } from '../warnings.js';
export declare function probeSandboxManifestReachable(_opts?: ProbeOptions): Promise<ProbeResult>;
export interface DeployRemediationResult {
    pass: boolean;
    message: string;
    logs?: string[];
    warning?: PreflightDeployPreconditionFailedWarning | PreflightDeployTimeoutWarning;
}
type PreconditionChecker = (probeId: string) => Promise<ProbeResult>;
/**
 * The deploy remediation executor. Called by runPreflightProbe when
 * remediate=true and the manifest probe has returned a shell action.
 *
 * IMPORTANT: Uses process.env.E2E_DEPLOY_STUB === '1' as the SOLE entry
 * to the stub branch. No other env var triggers the stub.
 *
 * Precondition gating (probes #1, #4, #6) only applies to the real-mode
 * spawn path. The stub branch bypasses preconditions since it never spawns.
 *
 * @param action - The shell action from the manifest probe failure
 * @param checkPrecondition - Callback to check precondition probes (#1, #4, #6)
 * @param opts - Optional spawn function injection for testing
 */
export declare function runDeployRemediation(action: ShellAction, checkPrecondition: PreconditionChecker, opts?: {
    spawn?: typeof spawn;
}): Promise<DeployRemediationResult>;
export {};
//# sourceMappingURL=manifest.d.ts.map