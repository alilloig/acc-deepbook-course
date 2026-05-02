export type RegistryWarning = {
    kind: 'no-paths-dir';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'empty-paths-dir';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'missing-path-json';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'malformed-path-json';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'invalid-path-json';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'missing-phases-json';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'malformed-phases-json';
    message: string;
    path?: string;
    dir?: string;
} | {
    kind: 'invalid-phases-json';
    message: string;
    path?: string;
    dir?: string;
};
export interface StateCorruptWarning {
    kind: 'state-corrupt';
    message: string;
    archivedTo?: string;
}
export interface StateSchemaMismatchWarning {
    kind: 'state-schema-mismatch';
    message: string;
    foundVersion?: number;
}
export type StateWarning = StateCorruptWarning | StateSchemaMismatchWarning;
export interface SettingsFileMissingWarning {
    kind: 'settings-file-missing';
    message: string;
}
export interface SettingsParseErrorWarning {
    kind: 'settings-parse-error';
    message: string;
}
export interface OutputStylePluginNotEnabledWarning {
    kind: 'output-style-plugin-not-enabled';
    message: string;
}
export interface PreflightFailWarning {
    kind: 'preflight-fail';
    message: string;
    probeId?: string;
}
export interface PreflightDeployPreconditionFailedWarning {
    kind: 'preflight-deploy-precondition-failed';
    message: string;
    probeId: string;
}
export interface PreflightDeployTimeoutWarning {
    kind: 'preflight-deploy-timeout';
    message: string;
    logs?: string[];
}
export type PreflightWarning = PreflightFailWarning | PreflightDeployPreconditionFailedWarning | PreflightDeployTimeoutWarning;
export interface PhaseEngineLoadFailedWarning {
    kind: 'phase-engine-phases-load-failed';
    message: string;
    slug: string;
    reason: string;
}
export interface PersonalizationValidationFailedWarning {
    kind: 'personalization-validation-failed';
    message: string;
    errors: string[];
}
export interface VerificationModeUnsupportedWarning {
    kind: 'verification-mode-unsupported';
    message: string;
    mode: string;
}
export type PhaseEngineWarning = PhaseEngineLoadFailedWarning | PersonalizationValidationFailedWarning | VerificationModeUnsupportedWarning;
export interface StateSaveFailedWarning {
    kind: 'state-save-failed';
    message: string;
}
export interface AutoWriteFailedWarning {
    kind: 'auto-write-failed';
    spotId: string;
    kind_detail: 'target-file-missing' | 'target-range-invalid' | 'snapshot-write-failed' | 'overwrite-failed' | 'path-traversal';
    message: string;
}
export interface OutputStyleDisabledWarning {
    kind: 'output-style-disabled';
    tool: string;
}
export type Cycle5Warning = StateSaveFailedWarning | AutoWriteFailedWarning | OutputStyleDisabledWarning;
export type EngineWarning = RegistryWarning | StateWarning | SettingsFileMissingWarning | SettingsParseErrorWarning | OutputStylePluginNotEnabledWarning | PreflightWarning | PhaseEngineWarning | Cycle5Warning;
//# sourceMappingURL=warnings.d.ts.map