const VALID_PERSONALIZATION_OPTIONS = new Set([
    'poll_interval_ms',
    'pool_subset',
]);
export function validatePath(v) {
    if (typeof v !== 'object' || v === null) {
        return { ok: false, error: 'path.json must be an object' };
    }
    const obj = v;
    if (typeof obj['slug'] !== 'string' || obj['slug'].length === 0) {
        return { ok: false, error: 'Missing required field: slug' };
    }
    if (typeof obj['title'] !== 'string') {
        return { ok: false, error: 'Missing required field: title' };
    }
    if (typeof obj['summary'] !== 'string') {
        return { ok: false, error: 'Missing required field: summary' };
    }
    if (typeof obj['build_command'] !== 'string') {
        return { ok: false, error: 'Missing required field: build_command' };
    }
    if (!Array.isArray(obj['personalization_options'])) {
        return { ok: false, error: 'personalization_options must be an array' };
    }
    for (const opt of obj['personalization_options']) {
        if (typeof opt !== 'string' || !VALID_PERSONALIZATION_OPTIONS.has(opt)) {
            return {
                ok: false,
                error: `Invalid personalization_options value: ${String(opt)}. Allowed: ${[...VALID_PERSONALIZATION_OPTIONS].join(', ')}`,
            };
        }
    }
    // Validate optional personalization_ranges if present
    let personalization_ranges;
    if (obj['personalization_ranges'] !== undefined) {
        if (typeof obj['personalization_ranges'] !== 'object' || obj['personalization_ranges'] === null) {
            return { ok: false, error: 'personalization_ranges must be an object' };
        }
        const pr = obj['personalization_ranges'];
        personalization_ranges = {};
        if (pr['poll_interval_ms'] !== undefined) {
            if (typeof pr['poll_interval_ms'] !== 'object' || pr['poll_interval_ms'] === null) {
                return { ok: false, error: 'personalization_ranges.poll_interval_ms must be an object' };
            }
            const pim = pr['poll_interval_ms'];
            if (typeof pim['min'] !== 'number' || typeof pim['max'] !== 'number' || typeof pim['default'] !== 'number') {
                return { ok: false, error: 'personalization_ranges.poll_interval_ms requires min, max, default as numbers' };
            }
            if (pim['min'] > pim['max']) {
                return { ok: false, error: 'personalization_ranges.poll_interval_ms: min must not exceed max' };
            }
            personalization_ranges.poll_interval_ms = {
                min: pim['min'],
                max: pim['max'],
                default: pim['default'],
            };
        }
        if (pr['pool_subset'] !== undefined) {
            if (typeof pr['pool_subset'] !== 'object' || pr['pool_subset'] === null) {
                return { ok: false, error: 'personalization_ranges.pool_subset must be an object' };
            }
            const ps = pr['pool_subset'];
            if (!Array.isArray(ps['values'])) {
                return { ok: false, error: 'personalization_ranges.pool_subset.values must be an array' };
            }
            if (typeof ps['default'] !== 'string') {
                return { ok: false, error: 'personalization_ranges.pool_subset.default must be a string' };
            }
            personalization_ranges.pool_subset = {
                values: ps['values'],
                default: ps['default'],
            };
        }
    }
    const result = {
        slug: obj['slug'],
        title: obj['title'],
        summary: obj['summary'],
        personalization_options: obj['personalization_options'],
        build_command: obj['build_command'],
    };
    if (personalization_ranges !== undefined) {
        result.personalization_ranges = personalization_ranges;
    }
    return { ok: true, value: result };
}
//# sourceMappingURL=path.js.map