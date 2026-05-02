export type PersonalizationOption = 'poll_interval_ms' | 'pool_subset';
export interface PersonalizationRangeInteger {
    min: number;
    max: number;
    default: number;
}
export interface PersonalizationRangeEnum {
    values: string[];
    default: string;
}
export interface PersonalizationRanges {
    poll_interval_ms?: PersonalizationRangeInteger;
    pool_subset?: PersonalizationRangeEnum;
}
export interface PathData {
    slug: string;
    title: string;
    summary: string;
    personalization_options: PersonalizationOption[];
    build_command: string;
    personalization_ranges?: PersonalizationRanges;
}
type ValidationResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: string;
};
export declare function validatePath(v: unknown): ValidationResult<PathData>;
export {};
//# sourceMappingURL=path.d.ts.map