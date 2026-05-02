import { probeOutputStyle } from '../outputStyle.js';
export async function probeLearningOutputStyleEnabled(_opts = {}) {
    const result = await probeOutputStyle();
    if (result.ok) {
        return { pass: true, message: 'learning-output-style plugin is enabled.' };
    }
    const message = result.warning?.message ??
        'learning-output-style plugin is not enabled. Enable it in Claude settings.';
    return { pass: false, message };
}
//# sourceMappingURL=learningOutputStyle.js.map