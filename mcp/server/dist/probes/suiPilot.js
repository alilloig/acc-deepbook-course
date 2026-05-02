import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
export async function probeSuiPilotEnabled(_opts = {}) {
    const settingsPath = path.join(os.homedir(), '.claude', 'settings.json');
    let raw;
    try {
        raw = fs.readFileSync(settingsPath, 'utf8');
    }
    catch (_err) {
        return {
            pass: false,
            message: 'sui-pilot plugin is not enabled. Run: claude plugins enable sui-pilot',
        };
    }
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch (_err) {
        return {
            pass: false,
            message: 'sui-pilot plugin is not enabled. Run: claude plugins enable sui-pilot',
        };
    }
    if (typeof parsed !== 'object' ||
        parsed === null ||
        !('enabledPlugins' in parsed) ||
        typeof parsed['enabledPlugins'] !== 'object' ||
        parsed['enabledPlugins'] === null) {
        return {
            pass: false,
            message: 'sui-pilot plugin is not enabled. Run: claude plugins enable sui-pilot',
        };
    }
    const enabledPlugins = parsed['enabledPlugins'];
    // Check for any key starting with 'sui-pilot@' that is set to true
    const found = Object.entries(enabledPlugins).some(([key, value]) => key.startsWith('sui-pilot@') && value === true);
    if (found) {
        return { pass: true, message: 'sui-pilot plugin is enabled.' };
    }
    return {
        pass: false,
        message: 'sui-pilot plugin is not enabled. Run: claude plugins enable sui-pilot',
    };
}
//# sourceMappingURL=suiPilot.js.map