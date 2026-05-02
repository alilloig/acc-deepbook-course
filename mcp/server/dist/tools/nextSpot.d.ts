import type { VerificationSpec } from '../schemas/phases.js';
export interface DocLink {
    path: string;
}
export interface SpotView {
    id: string;
    title?: string;
    target_file: string;
    target_range: string;
    prompt: string;
    verification: VerificationSpec;
    rungs?: {
        hint_md: string;
        reference_md: string;
        auto_write_md: string;
    };
    doc_links?: DocLink[];
}
export interface LadderState {
    hint_used: boolean;
    reference_shown: boolean;
    auto_completed: boolean;
    auto_write_attempted?: boolean;
}
export interface NextSpotResult {
    done: boolean;
    phase?: {
        id: string;
        title?: string;
        explainer_md?: string;
    };
    spot?: SpotView;
    ladder?: LadderState;
    error?: string;
}
export declare function runNextSpot({ projectRoot, }: {
    projectRoot: string;
}): Promise<NextSpotResult>;
export declare const nextSpot: typeof runNextSpot;
//# sourceMappingURL=nextSpot.d.ts.map