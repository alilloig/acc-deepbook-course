export declare class PathTraversalError extends Error {
    attempted: string;
    root: string;
    constructor(attempted: string, root: string);
}
/**
 * Resolve `untrusted` relative to `root` and assert the result is contained
 * within `root` (i.e., not a parent directory, not an absolute escape).
 *
 * Throws PathTraversalError if:
 *   - `untrusted` is absolute (path.join would still accept it and discard root)
 *   - the resolved path escapes root via `..` segments
 *
 * Returns the fully-resolved absolute path on success.
 */
export declare function containedPath(root: string, untrusted: string): string;
//# sourceMappingURL=pathSafety.d.ts.map