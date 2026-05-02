import type { ProbeId, ProbeOptions } from '../preflight.js';
import type { PreflightDeployPreconditionFailedWarning, PreflightDeployTimeoutWarning } from '../warnings.js';
export interface RunPreflightProbeArgs {
    probeId: string;
    remediate?: boolean;
    probeOpts?: Partial<Record<ProbeId, ProbeOptions>>;
}
export interface RunPreflightProbeResult {
    pass: boolean;
    message: string;
    action?: {
        kind: 'shell';
        command: string;
        cwd?: string;
        timeoutMs?: number;
    };
    logs?: string[];
    warning?: PreflightDeployPreconditionFailedWarning | PreflightDeployTimeoutWarning;
}
export declare function runPreflightProbe(args: RunPreflightProbeArgs): Promise<RunPreflightProbeResult>;
//# sourceMappingURL=runPreflightProbe.d.ts.map