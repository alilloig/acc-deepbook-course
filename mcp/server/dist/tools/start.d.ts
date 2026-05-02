import type { PathInfo, RegistryWarning } from '../registry.js';
import type { State } from '../state.js';
import type { StateWarning } from '../warnings.js';
export type { StateWarning };
export interface StartResult {
    outputStyleOk: boolean;
    preflight: {
        skipped: true;
        reason: 'cycle-1';
    };
    paths: PathInfo[];
    state: State | null;
    warnings: (RegistryWarning | StateWarning)[];
}
export declare function runStart({ projectRoot }: {
    projectRoot: string;
}): Promise<StartResult>;
//# sourceMappingURL=start.d.ts.map