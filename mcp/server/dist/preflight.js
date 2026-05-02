import { probeDockerRunning } from './probes/docker.js';
import { probeNodeVersion } from './probes/node.js';
import { probePnpmAvailable } from './probes/pnpm.js';
import { probeSuiCliVersion } from './probes/suiCli.js';
import { probeSuiPilotEnabled } from './probes/suiPilot.js';
import { probeSandboxRepoPresent } from './probes/sandboxRepo.js';
import { probeSandboxManifestReachable } from './probes/manifest.js';
import { probeLearningOutputStyleEnabled } from './probes/learningOutputStyle.js';
// The eight probe ids in spec-table order — frozen for immutability.
export const PROBE_ORDER = Object.freeze([
    'docker-running',
    'node-version',
    'pnpm-available',
    'sui-cli-version',
    'sui-pilot-enabled',
    'sandbox-repo-present',
    'sandbox-manifest-reachable',
    'learning-output-style-enabled',
]);
// Registry mapping probe ids to their implementations.
const PROBE_REGISTRY = {
    'docker-running': probeDockerRunning,
    'node-version': probeNodeVersion,
    'pnpm-available': probePnpmAvailable,
    'sui-cli-version': probeSuiCliVersion,
    'sui-pilot-enabled': probeSuiPilotEnabled,
    'sandbox-repo-present': probeSandboxRepoPresent,
    'sandbox-manifest-reachable': probeSandboxManifestReachable,
    'learning-output-style-enabled': probeLearningOutputStyleEnabled,
};
// M005 carry-forward: per-call ProbeOptions.spawn injection only; no module-level
// override. Harness fixtures pass stubs via ProbeOptions at the call site.
/**
 * Run the probe identified by probeId with the provided options.
 * Throws (or rejects) with a structured Error for unknown probe ids.
 */
export async function runProbe(probeId, opts) {
    const probe = PROBE_REGISTRY[probeId];
    if (!probe) {
        throw new Error(`Unknown probe id: '${String(probeId)}'. Valid ids: ${PROBE_ORDER.join(', ')}`);
    }
    return probe(opts);
}
//# sourceMappingURL=preflight.js.map