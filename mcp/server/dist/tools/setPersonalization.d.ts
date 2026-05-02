export interface SetPersonalizationResult {
    ok: boolean;
    errors?: string[];
}
export declare function runSetPersonalization({ projectRoot, values, }: {
    projectRoot: string;
    values: Record<string, unknown>;
}): Promise<SetPersonalizationResult>;
export declare const setPersonalization: typeof runSetPersonalization;
//# sourceMappingURL=setPersonalization.d.ts.map