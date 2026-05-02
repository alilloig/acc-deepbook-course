import type { VerifySpawnFn } from '../verify.js';
import type { LadderRung } from '../schemas/state.js';
export interface AutoVerifyResult {
    pass: boolean;
    advanced: boolean;
    output?: string;
}
export type RequestHintErrorKind = 'output-style-disabled' | 'no-state' | 'no-path-selected' | 'state-corrupt' | 'state-schema-mismatch' | 'state-save-failed' | 'no-active-spot' | 'rung-out-of-order' | 'phases-load-failed' | 'rung-content-missing' | 'auto-write-failed';
export interface RequestHintError {
    kind: RequestHintErrorKind;
    message: string;
    requestedRung?: 1 | 2 | 3;
    requiredPriorRung?: 1 | 2;
    missingFlag?: 'hint_used' | 'reference_shown';
}
export type RequestHintResult = {
    ok: true;
    payload: string;
    newLadder: LadderRung;
    autoVerifyResult?: AutoVerifyResult;
} | {
    ok: false;
    error: RequestHintError;
};
export interface RequestHintOptions {
    spawn?: VerifySpawnFn;
}
export declare function runRequestHint(args: {
    projectRoot: string;
    rung: 1 | 2 | 3;
}, opts?: RequestHintOptions): Promise<RequestHintResult>;
export declare const requestHint: typeof runRequestHint;
//# sourceMappingURL=requestHint.d.ts.map