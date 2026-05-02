export interface VerificationCompile {
    mode: 'compile';
    command: string;
}
export interface VerificationTest {
    mode: 'test';
    command: string;
    expected_pass?: number;
}
export interface VerificationSimulate {
    mode: 'simulate';
    endpoint: string;
    expected_status: number;
}
export interface VerificationCustom {
    mode: 'custom';
    command: string;
    expected_stdout_regex: string;
}
export type VerificationSpec = VerificationCompile | VerificationTest | VerificationSimulate | VerificationCustom;
export interface SpotRungs {
    hint_md: string;
    reference_md: string;
    auto_write_md: string;
}
export interface SpotData {
    id: string;
    title?: string;
    target_file?: string;
    target_range?: string;
    prompt?: string;
    verification?: VerificationSpec;
    rungs?: SpotRungs;
    doc_links?: string[];
}
export interface PhaseData {
    id: string;
    title?: string;
    explainer_md?: string;
    spots: SpotData[];
}
export interface PhasesData {
    phases: PhaseData[];
}
type ValidationResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: string;
};
export declare function validatePhases(v: unknown): ValidationResult<PhasesData>;
export {};
//# sourceMappingURL=phases.d.ts.map