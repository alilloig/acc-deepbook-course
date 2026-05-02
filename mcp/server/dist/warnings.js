// Unified discriminated-union of all engine warnings.
// Resolves cycle 2 carry-forwards C017+C018.
// Cycle 4: tightened RegistryWarning to 8 literal kinds; dropped orphan interfaces.
// Cycle 5: added state-save-failed, auto-write-failed, output-style-disabled (non-registry kinds).
// Cycle 5.5: added 'path-traversal' to AutoWriteFailedWarning.kind_detail (C021/C022/C012 remediation).
// Cycle 6: added OutputStylePluginNotEnabledWarning (H002 fix).
export {};
//# sourceMappingURL=warnings.js.map