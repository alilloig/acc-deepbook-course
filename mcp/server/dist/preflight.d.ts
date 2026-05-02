export interface ShellAction {
    kind: 'shell';
    command: string;
    cwd?: string;
    timeoutMs?: number;
}
export interface ProbeResult {
    pass: boolean;
    message: string;
    action?: ShellAction;
}
export type SpawnFn = (cmd: string, args: string[], opts?: {
    timeout?: number;
}) => {
    status: number | null;
    stdout: string;
    stderr: string;
};
export type ProbeId = 'docker-running' | 'node-version' | 'pnpm-available' | 'sui-cli-version' | 'sui-pilot-enabled' | 'sandbox-repo-present' | 'sandbox-manifest-reachable' | 'learning-output-style-enabled';
export type ProbeOptions = {
    spawn?: SpawnFn;
    remediate?: boolean;
};
export type ProbeFn = (opts: ProbeOptions) => Promise<ProbeResult>;
export declare const PROBE_ORDER: readonly ProbeId[];
/**
 * Run the probe identified by probeId with the provided options.
 * Throws (or rejects) with a structured Error for unknown probe ids.
 */
export declare function runProbe(probeId: ProbeId, opts: ProbeOptions): Promise<ProbeResult>;
//# sourceMappingURL=preflight.d.ts.map