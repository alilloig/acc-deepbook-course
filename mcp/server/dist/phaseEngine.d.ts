import type { PhasesData, PhaseData, SpotData } from './schemas/phases.js';
import type { State } from './schemas/state.js';
export type { PhasesData, PhaseData, SpotData };
/**
 * Error thrown when phases.json cannot be loaded at runtime.
 * The registry validates at scan time but a path can disappear between scan and use.
 */
export declare class LoadPhasesError extends Error {
    readonly slug: string;
    constructor(slug: string, reason: string);
}
/**
 * Load and validate paths/<slug>/phases.json from projectRoot.
 */
export declare function loadPhases(projectRoot: string, slug: string): Promise<PhasesData>;
export type GetCurrentSpotResult = {
    done: true;
} | {
    done: false;
    phase: PhaseData;
    spot: SpotData;
};
/**
 * Resolve the current phase/spot from state.cursor against the loaded phases.
 * Returns { done: true } when the cursor is past the end.
 */
export declare function getCurrentSpot(state: State, phases: PhasesData): GetCurrentSpotResult;
/**
 * Advance the cursor to the next spot (or mark done when past the last spot).
 * Returns a new State (original is not mutated).
 * Throws if already done.
 */
export declare function advanceCursor(state: State, phases: PhasesData): State;
//# sourceMappingURL=phaseEngine.d.ts.map