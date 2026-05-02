export interface Prompt {
    name: string;
    type: 'integer' | 'enum';
    range?: {
        min: number;
        max: number;
        default: number;
    };
    enum?: string[];
    default?: string | number;
}
export interface SelectPathResult {
    ok: boolean;
    personalizationPrompts?: Prompt[];
    errors?: string[];
}
export declare function runSelectPath({ projectRoot, slug, }: {
    projectRoot: string;
    slug?: unknown;
}): Promise<SelectPathResult>;
export declare const selectPath: typeof runSelectPath;
//# sourceMappingURL=selectPath.d.ts.map