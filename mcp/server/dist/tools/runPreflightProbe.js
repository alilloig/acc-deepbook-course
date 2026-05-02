import { PROBE_ORDER, runProbe } from '../preflight.js';
import { runDeployRemediation } from '../probes/manifest.js';
export async function runPreflightProbe(args) {
    const { probeId, remediate = false, probeOpts = {} } = args;
    // Validate probeId
    if (!PROBE_ORDER.includes(probeId)) {
        return {
            pass: false,
            message: `Unknown probe id: '${probeId}'. Valid ids are: ${PROBE_ORDER.join(', ')}`,
        };
    }
    // Run the probe — use probeOpts entry for this probe if provided
    let probeResult;
    try {
        probeResult = await runProbe(probeId, probeOpts[probeId] ?? {});
    }
    catch (err) {
        return {
            pass: false,
            message: `Probe '${probeId}' threw an unexpected error: ${err instanceof Error ? err.message : String(err)}`,
        };
    }
    // If remediate is false, or probe passed, or there's no shell action — return as-is.
    if (!remediate || probeResult.pass || !probeResult.action || probeResult.action.kind !== 'shell') {
        return {
            pass: probeResult.pass,
            message: probeResult.message,
            ...(probeResult.action ? { action: probeResult.action } : {}),
        };
    }
    // remediate=true AND probe failed AND action is a shell action
    // Thread probeOpts through runDeployRemediation so harness stubs flow through
    // the precondition gate (H004 / AC-2.4 fix).
    const deployResult = await runDeployRemediation(probeResult.action, (pid) => runProbe(pid, probeOpts[pid] ?? {}));
    return {
        pass: deployResult.pass,
        message: deployResult.message,
        ...(deployResult.logs ? { logs: deployResult.logs } : {}),
        ...(deployResult.warning ? { warning: deployResult.warning } : {}),
    };
}
//# sourceMappingURL=runPreflightProbe.js.map