import type { State } from './schemas/state.js';
import type { SpotData } from './schemas/phases.js';
export type AutoWriteErrorKind = 'target-file-missing' | 'target-range-invalid' | 'snapshot-write-failed' | 'overwrite-failed' | 'path-traversal';
export declare class AutoWriteError extends Error {
    readonly kind: AutoWriteErrorKind;
    constructor(kind: AutoWriteErrorKind, message: string);
}
export interface AutoWriteResult {
    backupPath: string;
    bytesWritten: number;
}
/**
 * Returns a new State whose ladder[spotId] has the rung's flag set to true.
 * Rung 1 → hint_used
 * Rung 2 → reference_shown
 * Rung 3 → auto_completed + auto_write_attempted
 * Never sets a flag from true to false.
 */
export declare function recordRungUse(state: State, spotId: string, rung: 1 | 2 | 3): State;
export type CanAdvanceRungResult = {
    ok: true;
} | {
    ok: false;
    missingFlag: 'hint_used' | 'reference_shown';
    requiredPriorRung: 1 | 2;
};
/**
 * Check whether the given rung can be requested.
 * Rung 1: always ok.
 * Rung 2: requires hint_used === true.
 * Rung 3: requires reference_shown === true.
 */
export declare function canAdvanceRung(state: State, spotId: string, rung: 1 | 2 | 3): CanAdvanceRungResult;
/**
 * Snapshot the existing target_range bytes to a .bak file, then overwrite
 * that range with the substituted payload.
 *
 * Step ordering:
 *  (a) Read target_file (reject on ENOENT)
 *  (b) Parse + validate target_range
 *  (c) Write snapshot .bak (wx + 0o600), rotate any existing .bak first
 *  (d) Overwrite target_file with the spliced payload
 *
 * Returns { backupPath, bytesWritten }.
 */
export declare function runAutoWrite(projectRoot: string, spot: Pick<SpotData, 'id' | 'target_file' | 'target_range'>, payload: string): Promise<AutoWriteResult>;
//# sourceMappingURL=ladder.d.ts.map