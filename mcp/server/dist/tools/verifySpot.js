import { loadState, saveState } from '../state.js';
import { loadPhases, getCurrentSpot, advanceCursor } from '../phaseEngine.js';
import { runVerification, VerificationModeUnsupportedError } from '../verify.js';
import { probeOutputStyle } from '../outputStyle.js';
export async function runVerifySpot(args, opts) {
    const { projectRoot } = args;
    // L002 carry-forward: outputStyleOk gate runs BEFORE any state load
    const styleCheck = await probeOutputStyle();
    if (!styleCheck.ok) {
        return { pass: false, error: 'output-style-disabled', advanced: false };
    }
    // Load state
    const stateResult = await loadState(projectRoot);
    if (stateResult.kind === 'corrupt') {
        return { pass: false, error: `State corrupt: ${stateResult.message}` };
    }
    if (stateResult.kind === 'schema-mismatch') {
        return { pass: false, error: `State schema mismatch: ${stateResult.message}` };
    }
    if (stateResult.kind === 'absent' || !stateResult.state.selected_path) {
        return { pass: false, error: 'No path selected. Call selectPath first.' };
    }
    const state = stateResult.state;
    const slug = state.selected_path;
    // Load phases
    let phasesData;
    try {
        phasesData = await loadPhases(projectRoot, slug);
    }
    catch (err) {
        return { pass: false, error: `Failed to load phases: ${String(err)}` };
    }
    // Get current spot
    const current = getCurrentSpot(state, phasesData);
    if (current.done) {
        return { pass: false, error: 'No active spot (path is done)' };
    }
    const { spot } = current;
    // Ensure the spot has a verification block (full spot, not a stub)
    if (spot.verification === undefined) {
        return { pass: false, error: `Spot ${spot.id} has no verification block; cannot verify` };
    }
    // Cast through unknown to satisfy TS strict — spot.verification is a VerificationSpec
    // as validated by the schema (validatePhases runtime check above)
    const verSpec = spot.verification;
    // M001 carry-forward: wrap runVerification call to catch VerificationModeUnsupportedError
    let verResult;
    try {
        verResult = await runVerification(verSpec, projectRoot, { spawn: opts?.spawn });
    }
    catch (err) {
        if (err instanceof VerificationModeUnsupportedError) {
            return {
                pass: false,
                error: `verification mode '${err.mode}' not yet supported`,
                advanced: false,
            };
        }
        throw err;
    }
    if (verResult.pass) {
        // Advance cursor
        const advancedState = advanceCursor(state, phasesData);
        // M002 carry-forward: wrap saveState in try/catch
        try {
            await saveState(projectRoot, advancedState);
        }
        catch (err) {
            const e = err;
            return {
                pass: true,
                output: verResult.output,
                advanced: false,
                error: `verification passed but state persist failed: ${e.message}`,
            };
        }
        return { pass: true, output: verResult.output, advanced: true };
    }
    else {
        // Leave cursor untouched
        return { pass: false, output: verResult.output, advanced: false };
    }
}
// Alias export expected by tests
export const verifySpot = runVerifySpot;
//# sourceMappingURL=verifySpot.js.map