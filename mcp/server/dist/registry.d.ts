import type { RegistryWarning } from './warnings.js';
export type { RegistryWarning };
export interface PathInfo {
    slug: string;
    title: string;
    summary: string;
    personalization_options: string[];
    build_command: string;
}
export interface RegistryResult {
    paths: PathInfo[];
    warnings: RegistryWarning[];
}
export declare function scanRegistry(scanRoot: string): Promise<RegistryResult>;
//# sourceMappingURL=registry.d.ts.map