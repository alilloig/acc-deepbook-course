import { spawnSync } from 'node:child_process';
export async function probeDockerRunning(opts = {}) {
    const spawnFn = opts.spawn ?? defaultSpawn;
    try {
        const result = spawnFn('docker', ['info'], { timeout: 5000 });
        if (result.status === 0) {
            return { pass: true, message: 'Docker Desktop is running.' };
        }
        return {
            pass: false,
            message: 'Docker Desktop is not running. Open Docker Desktop and re-run /start.',
        };
    }
    catch (_err) {
        // ENOENT or other spawn error
        return {
            pass: false,
            message: 'Docker Desktop is not running. Open Docker Desktop and re-run /start.',
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
//# sourceMappingURL=docker.js.map