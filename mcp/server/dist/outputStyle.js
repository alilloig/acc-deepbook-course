import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
const PLUGIN_KEY = 'learning-output-style@claude-plugins-official';
const PLUGIN_NOT_ENABLED_WARNING = {
    kind: 'output-style-plugin-not-enabled',
    message: `The learning output style plugin is not enabled. To activate it, run: claude plugins enable learning-output-style@claude-plugins-official`,
};
export async function probeOutputStyle() {
    const settingsPath = path.join(os.homedir(), '.claude', 'settings.json');
    let raw;
    try {
        raw = fs.readFileSync(settingsPath, 'utf8');
    }
    catch {
        return {
            ok: false,
            warning: {
                kind: 'settings-file-missing',
                message: `Settings file not found at ${settingsPath}`,
            },
        };
    }
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch (err) {
        return {
            ok: false,
            warning: {
                kind: 'settings-parse-error',
                message: `Failed to parse ${settingsPath}: ${err instanceof Error ? err.message : String(err)}`,
            },
        };
    }
    if (typeof parsed !== 'object' ||
        parsed === null ||
        !('enabledPlugins' in parsed) ||
        typeof parsed['enabledPlugins'] !== 'object' ||
        parsed['enabledPlugins'] === null) {
        return { ok: false, warning: PLUGIN_NOT_ENABLED_WARNING };
    }
    // Phase F round-2 fast-follow L009: enabledPlugins as an Array (e.g. `[]`)
    // passes typeof === 'object' but is structurally wrong — settings.json is
    // expected to use the object/record shape. Distinguish this from "plugin
    // not enabled" so the user knows to fix the file shape, not enable a
    // plugin. The settings-parse-error kind already covers other malformed
    // settings shapes.
    if (Array.isArray(parsed['enabledPlugins'])) {
        return {
            ok: false,
            warning: {
                kind: 'settings-parse-error',
                message: `~/.claude/settings.json field 'enabledPlugins' must be an object, got an array. Fix the file shape.`,
            },
        };
    }
    const enabledPlugins = parsed['enabledPlugins'];
    const pluginEnabled = enabledPlugins[PLUGIN_KEY];
    if (pluginEnabled === true) {
        return { ok: true };
    }
    return { ok: false, warning: PLUGIN_NOT_ENABLED_WARNING };
}
//# sourceMappingURL=outputStyle.js.map