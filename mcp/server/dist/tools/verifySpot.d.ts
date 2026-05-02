import type { VerifySpawnFn } from '../verify.js';
export interface VerifySpotResult {
    pass: boolean;
    output?: string;
    advanced?: boolean;
    error?: string;
}
export interface VerifySpotOptions {
    spawn?: VerifySpawnFn;
}
export declare function runVerifySpot(args: {
    projectRoot: string;
}, opts?: VerifySpotOptions): Promise<VerifySpotResult>;
export declare const verifySpot: typeof runVerifySpot;
//# sourceMappingURL=verifySpot.d.ts.map