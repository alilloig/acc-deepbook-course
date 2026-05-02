export interface Cursor {
    phase_id: string;
    spot_id: string;
}
export interface Personalization {
    [key: string]: unknown;
}
export interface LadderRung {
    hint_used: boolean;
    reference_shown: boolean;
    auto_completed: boolean;
    auto_write_attempted: boolean;
}
export interface HistoryEntry {
    ts: string;
    event: string;
}
export interface State {
    schema_version: number;
    selected_path: string;
    personalization: Personalization;
    cursor: Cursor;
    ladder: Record<string, LadderRung>;
    history: HistoryEntry[];
}
type ValidationResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: string;
};
export declare function validateState(v: unknown): ValidationResult<State>;
export {};
//# sourceMappingURL=state.d.ts.map