export interface OutputStyleWarning {
    kind: string;
    message: string;
}
export interface OutputStyleResult {
    ok: boolean;
    warning?: OutputStyleWarning;
}
export declare function probeOutputStyle(): Promise<OutputStyleResult>;
//# sourceMappingURL=outputStyle.d.ts.map