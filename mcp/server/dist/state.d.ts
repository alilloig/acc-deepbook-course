import type { State } from './schemas/state.js';
export type { State };
export declare const STATE_SCHEMA_VERSION = 1;
export type LoadStateResult = {
    kind: 'absent';
} | {
    kind: 'ok';
    state: State;
} | {
    kind: 'corrupt';
    archivedTo?: string;
    message: string;
} | {
    kind: 'schema-mismatch';
    foundVersion: number;
    message: string;
};
export declare function loadState(projectRoot: string): Promise<LoadStateResult>;
export declare function saveState(projectRoot: string, state: State): Promise<void>;
//# sourceMappingURL=state.d.ts.map