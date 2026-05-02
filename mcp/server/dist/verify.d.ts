import type { VerificationSpec } from './schemas/phases.js';
export type { VerificationSpec };
export interface VerificationResult {
    pass: boolean;
    output?: string;
}
export type VerifySpawnFn = (cmd: string, args: string[], opts?: {
    cwd?: string;
    timeout?: number;
}) => {
    status: number | null;
    stdout: string;
    stderr: string;
};
export interface VerifyOptions {
    spawn?: VerifySpawnFn;
}
/**
 * Error thrown when a verification mode is not yet supported in cycle 4.
 * Cycle 5+ will replace the stub bodies for test/simulate/custom.
 */
export declare class VerificationModeUnsupportedError extends Error {
    readonly mode: string;
    constructor(mode: string);
}
/**
 * Parse a shell-style command string into a { cmd, args } pair.
 * Handles double-quoted segments (strips quotes, preserves internal spaces).
 * Collapses runs of whitespace between tokens.
 * Does NOT handle backslash escapes or single-quoted args.
 * Throws if the input is empty or whitespace-only.
 *
 * Examples:
 *   'pnpm build'            → { cmd: 'pnpm', args: ['build'] }
 *   'pnpm run build'        → { cmd: 'pnpm', args: ['run', 'build'] }
 *   'pnpm "build dir" -x'   → { cmd: 'pnpm', args: ['build dir', '-x'] }
 *   '   pnpm   build   '    → { cmd: 'pnpm', args: ['build'] }
 */
export declare function parseCommand(cmd: string): {
    cmd: string;
    args: string[];
};
/**
 * Run verification against the student's working tree.
 * Only the compile adapter is implemented in cycle 4.
 * test/simulate/custom throw VerificationModeUnsupportedError.
 *
 * NOTE (cycle-4 H001 remediation): there is intentionally NO module-level
 * mutable test override seam exported from this file. Cycle 4 A13 retired the
 * equivalent pattern from preflight.ts; cycle-4 review (R1-001 / R2-001 /
 * R3-003 / R4-001 / R5-002 / R6-001 — 6/6 reviewers) caught the same
 * anti-pattern being re-introduced under a different name here. Test stubbing
 * is now done at the *harness* boundary: the harness intercepts
 * `callTool('verifySpot', ...)` and returns a pre-installed stub envelope
 * without calling into production code. The harness is consumed only by
 * tests, so the test seam lives in test infrastructure rather than on the
 * production import surface.
 */
export declare function runVerification(adapter: VerificationSpec, projectRoot: string, opts?: VerifyOptions): Promise<VerificationResult>;
//# sourceMappingURL=verify.d.ts.map