// ---------------------------------------------------------------------------
// Security: slug and path validation helpers
// ---------------------------------------------------------------------------
/**
 * Slug regex: must start with [a-z0-9], followed by zero or more [a-z0-9_-].
 * No slashes, no dots, no leading dash or underscore.
 */
const SLUG_REGEX = /^[a-z0-9][a-z0-9_-]*$/;
function isValidSlug(s) {
    return SLUG_REGEX.test(s);
}
/**
 * Validate that a relative file path is safe:
 * - Must not be absolute (no leading /)
 * - Must not contain any .. segment
 */
function isValidRelPath(p) {
    if (p.startsWith('/') || p.startsWith('\\')) {
        return false;
    }
    // Normalize separators and split
    const segments = p.replace(/\\/g, '/').split('/');
    return !segments.includes('..');
}
// ---------------------------------------------------------------------------
function validateVerification(v, phaseId, spotId) {
    if (typeof v !== 'object' || v === null) {
        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: verification must be an object` };
    }
    const obj = v;
    const mode = obj['mode'];
    if (mode !== 'compile' && mode !== 'test' && mode !== 'simulate' && mode !== 'custom') {
        return {
            ok: false,
            error: `Phase ${phaseId} spot ${spotId}: verification.mode must be one of compile|test|simulate|custom`,
        };
    }
    if (mode === 'compile') {
        if (typeof obj['command'] !== 'string') {
            return { ok: false, error: `Phase ${phaseId} spot ${spotId}: compile verification requires a command string` };
        }
        return { ok: true, value: { mode: 'compile', command: obj['command'] } };
    }
    if (mode === 'test') {
        if (typeof obj['command'] !== 'string') {
            return { ok: false, error: `Phase ${phaseId} spot ${spotId}: test verification requires a command string` };
        }
        const result = { mode: 'test', command: obj['command'] };
        if (typeof obj['expected_pass'] === 'number') {
            result.expected_pass = obj['expected_pass'];
        }
        return { ok: true, value: result };
    }
    if (mode === 'simulate') {
        if (typeof obj['endpoint'] !== 'string') {
            return { ok: false, error: `Phase ${phaseId} spot ${spotId}: simulate verification requires an endpoint string` };
        }
        if (typeof obj['expected_status'] !== 'number') {
            return { ok: false, error: `Phase ${phaseId} spot ${spotId}: simulate verification requires expected_status number` };
        }
        return {
            ok: true,
            value: {
                mode: 'simulate',
                endpoint: obj['endpoint'],
                expected_status: obj['expected_status'],
            },
        };
    }
    // mode === 'custom'
    if (typeof obj['command'] !== 'string') {
        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: custom verification requires a command string` };
    }
    if (typeof obj['expected_stdout_regex'] !== 'string') {
        return {
            ok: false,
            error: `Phase ${phaseId} spot ${spotId}: custom verification requires expected_stdout_regex string`,
        };
    }
    return {
        ok: true,
        value: {
            mode: 'custom',
            command: obj['command'],
            expected_stdout_regex: obj['expected_stdout_regex'],
        },
    };
}
export function validatePhases(v) {
    if (typeof v !== 'object' || v === null) {
        return { ok: false, error: 'phases.json must be an object' };
    }
    const obj = v;
    if (!Array.isArray(obj['phases'])) {
        return { ok: false, error: 'Missing required field: phases (must be an array)' };
    }
    const phases = obj['phases'];
    if (phases.length === 0) {
        return { ok: false, error: 'phases array must have at least one phase' };
    }
    const validatedPhases = [];
    for (const phase of phases) {
        if (typeof phase !== 'object' || phase === null) {
            return { ok: false, error: 'Each phase must be an object' };
        }
        const p = phase;
        if (typeof p['id'] !== 'string') {
            return { ok: false, error: 'Each phase must have a string id' };
        }
        const phaseId = p['id'];
        // Security: validate phase.id against slug regex
        if (!isValidSlug(phaseId)) {
            return {
                ok: false,
                error: `Phase id '${phaseId}' is invalid: must match /^[a-z0-9][a-z0-9_-]*$/ (no slashes, dots, or leading dash/underscore)`,
            };
        }
        if (!Array.isArray(p['spots'])) {
            return { ok: false, error: `Phase ${phaseId}: spots must be an array` };
        }
        if (p['spots'].length === 0) {
            return { ok: false, error: `Phase ${phaseId}: spots array must have at least one spot` };
        }
        const validatedSpots = [];
        for (const spot of p['spots']) {
            if (typeof spot !== 'object' || spot === null) {
                return { ok: false, error: `Phase ${phaseId}: each spot must be an object` };
            }
            const s = spot;
            if (typeof s['id'] !== 'string') {
                return { ok: false, error: `Phase ${phaseId}: each spot must have a string id` };
            }
            const spotId = s['id'];
            // Security: validate spot.id against slug regex
            if (!isValidSlug(spotId)) {
                return {
                    ok: false,
                    error: `Phase ${phaseId} spot id '${spotId}' is invalid: must match /^[a-z0-9][a-z0-9_-]*$/ (no slashes, dots, or leading dash/underscore)`,
                };
            }
            // Determine if this is a "full" spot (any of the phase-1 fields present)
            // or a "stub" spot (only id/title). Full spots require all four fields.
            // Stub spots are backward-compat with cycle-1/2/3 fixtures (id + title only).
            const hasAnyNewField = s['target_file'] !== undefined ||
                s['target_range'] !== undefined ||
                s['prompt'] !== undefined ||
                s['verification'] !== undefined;
            const spotData = { id: spotId };
            if (typeof s['title'] === 'string')
                spotData.title = s['title'];
            if (hasAnyNewField) {
                // Full spot validation: all four required fields must be present
                if (typeof s['target_file'] !== 'string') {
                    return { ok: false, error: `Phase ${phaseId} spot ${spotId}: target_file must be a string` };
                }
                // Security: validate target_file is a safe relative path (C021 fix at schema level)
                if (!isValidRelPath(s['target_file'])) {
                    return {
                        ok: false,
                        error: `Phase ${phaseId} spot ${spotId}: target_file '${s['target_file']}' is invalid: must be a relative path with no '..' segments and no leading '/'`,
                    };
                }
                if (typeof s['target_range'] !== 'string') {
                    return { ok: false, error: `Phase ${phaseId} spot ${spotId}: target_range must be a string` };
                }
                if (typeof s['prompt'] !== 'string') {
                    return { ok: false, error: `Phase ${phaseId} spot ${spotId}: prompt must be a string` };
                }
                const verResult = validateVerification(s['verification'], phaseId, spotId);
                if (!verResult.ok) {
                    return { ok: false, error: verResult.error };
                }
                spotData.target_file = s['target_file'];
                spotData.target_range = s['target_range'];
                spotData.prompt = s['prompt'];
                spotData.verification = verResult.value;
                // Validate rungs if present
                if (s['rungs'] !== undefined) {
                    if (typeof s['rungs'] !== 'object' || s['rungs'] === null) {
                        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: rungs must be an object` };
                    }
                    const r = s['rungs'];
                    if (typeof r['hint_md'] !== 'string') {
                        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: rungs.hint_md must be a string` };
                    }
                    if (typeof r['reference_md'] !== 'string') {
                        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: rungs.reference_md must be a string` };
                    }
                    if (typeof r['auto_write_md'] !== 'string') {
                        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: rungs.auto_write_md must be a string` };
                    }
                    // Security: validate rungs paths are safe relative paths (C012 fix at schema level)
                    for (const [field, value] of [
                        ['rungs.hint_md', r['hint_md']],
                        ['rungs.reference_md', r['reference_md']],
                        ['rungs.auto_write_md', r['auto_write_md']],
                    ]) {
                        if (!isValidRelPath(value)) {
                            return {
                                ok: false,
                                error: `Phase ${phaseId} spot ${spotId}: ${field} '${value}' is invalid: must be a relative path with no '..' segments and no leading '/'`,
                            };
                        }
                    }
                    spotData.rungs = {
                        hint_md: r['hint_md'],
                        reference_md: r['reference_md'],
                        auto_write_md: r['auto_write_md'],
                    };
                }
                if (s['doc_links'] !== undefined) {
                    if (!Array.isArray(s['doc_links'])) {
                        return { ok: false, error: `Phase ${phaseId} spot ${spotId}: doc_links must be an array` };
                    }
                    spotData.doc_links = s['doc_links'];
                }
            }
            // else: stub spot — just id + title, no new fields required
            validatedSpots.push(spotData);
        }
        const phaseData = {
            id: phaseId,
            spots: validatedSpots,
        };
        if (typeof p['title'] === 'string')
            phaseData.title = p['title'];
        if (typeof p['explainer_md'] === 'string')
            phaseData.explainer_md = p['explainer_md'];
        validatedPhases.push(phaseData);
    }
    return {
        ok: true,
        value: { phases: validatedPhases },
    };
}
//# sourceMappingURL=phases.js.map