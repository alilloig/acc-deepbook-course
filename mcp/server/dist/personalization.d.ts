export interface PersonalizationOptionDecl {
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
export interface IntegerOptionDesc {
    type: 'integer';
    min: number;
    max: number;
    default: number;
}
export interface EnumOptionDesc {
    type: 'enum';
    enum: readonly string[] | string[];
    default: string;
}
export type OptionDesc = IntegerOptionDesc | EnumOptionDesc;
type DeclaredOptions = PersonalizationOptionDecl[] | Record<string, OptionDesc>;
type ValidationResult = {
    ok: true;
    values: Record<string, unknown>;
} | {
    ok: false;
    errors: string[];
};
/**
 * Validate personalization values against declared options.
 * Empty values object is valid (Use defaults path).
 * Returns ok:true with the values map, or ok:false with an errors array.
 */
export declare function validatePersonalizationValues(values: Record<string, unknown>, declared: DeclaredOptions): ValidationResult;
/**
 * Substitute {{ key }} and {{key}} placeholders in a prompt string with values.
 * Leaves unknown placeholders intact (no error on missing key).
 * MUST ONLY be called on prompt strings — not target_file, target_range,
 * verification.command, or verification.endpoint.
 */
export declare function substitutePromptOnly(prompt: string, values: Record<string, unknown>): string;
export {};
//# sourceMappingURL=personalization.d.ts.map