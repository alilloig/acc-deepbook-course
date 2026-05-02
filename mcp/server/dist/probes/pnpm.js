import { spawnSync } from 'node:child_process';
export async function probePnpmAvailable(opts = {}) {
    const spawnFn = opts.spawn ?? defaultSpawn;
    try {
        const result = spawnFn('pnpm', ['--version'], { timeout: 5000 });
        if (result.status === 0) {
            const version = (result.stdout ?? '').trim();
            return {
                pass: true,
                message: `pnpm ${version} is available.`,
            };
        }
        return {
            pass: false,
            message: 'pnpm is not available. Install it with: npm install -g pnpm',
        };
    }
    catch (_err) {
        // ENOENT or other spawn error
        return {
            pass: false,
            message: 'pnpm is not available. Install it with: npm install -g pnpm',
        };
    }
}
function defaultSpawn(cmd, args, opts) {
    const result = spawnSync(cmd, args, {
        encoding: 'utf8',
        timeout: opts?.timeout ?? 5000,
    });
    if (result.error) {
        throw result.error;
    }
    return {
        status: result.status,
        stdout: result.stdout ?? '',
        stderr: result.stderr ?? '',
    };
}
//# sourceMappingURL=pnpm.js.map