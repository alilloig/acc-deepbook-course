export function validateState(v) {
    if (typeof v !== 'object' || v === null || Array.isArray(v)) {
        return { ok: false, error: 'state must be a non-null object' };
    }
    const obj = v;
    if (typeof obj['schema_version'] !== 'number') {
        return { ok: false, error: 'schema_version must be a number' };
    }
    if (typeof obj['selected_path'] !== 'string') {
        return { ok: false, error: 'selected_path must be a string' };
    }
    if (typeof obj['personalization'] !== 'object' ||
        obj['personalization'] === null ||
        Array.isArray(obj['personalization'])) {
        return { ok: false, error: 'personalization must be a non-null object' };
    }
    if (typeof obj['cursor'] !== 'object' ||
        obj['cursor'] === null ||
        Array.isArray(obj['cursor'])) {
        return { ok: false, error: 'cursor must be a non-null object' };
    }
    const cursor = obj['cursor'];
    if (typeof cursor['phase_id'] !== 'string') {
        return { ok: false, error: 'cursor.phase_id must be a string' };
    }
    if (typeof cursor['spot_id'] !== 'string') {
        return { ok: false, error: 'cursor.spot_id must be a string' };
    }
    if (typeof obj['ladder'] !== 'object' ||
        obj['ladder'] === null ||
        Array.isArray(obj['ladder'])) {
        return { ok: false, error: 'ladder must be a non-null object' };
    }
    if (!Array.isArray(obj['history'])) {
        return { ok: false, error: 'history must be an array' };
    }
    // Normalize ladder rungs: add auto_write_attempted: false default if absent.
    const rawLadder = obj['ladder'];
    const normalizedLadder = {};
    for (const [key, rung] of Object.entries(rawLadder)) {
        if (typeof rung === 'object' && rung !== null) {
            const r = rung;
            normalizedLadder[key] = {
                hint_used: typeof r['hint_used'] === 'boolean' ? r['hint_used'] : false,
                reference_shown: typeof r['reference_shown'] === 'boolean' ? r['reference_shown'] : false,
                auto_completed: typeof r['auto_completed'] === 'boolean' ? r['auto_completed'] : false,
                auto_write_attempted: typeof r['auto_write_attempted'] === 'boolean' ? r['auto_write_attempted'] : false,
            };
        }
    }
    return {
        ok: true,
        value: {
            schema_version: obj['schema_version'],
            selected_path: obj['selected_path'],
            personalization: obj['personalization'],
            cursor: {
                phase_id: cursor['phase_id'],
                spot_id: cursor['spot_id'],
            },
            ladder: normalizedLadder,
            history: obj['history'],
        },
    };
}
//# sourceMappingURL=state.js.map