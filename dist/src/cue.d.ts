import { IGo } from 'go-wasm/src/1.17/go';
import { IGlobal } from 'go-wasm/src/1.17/global';
export interface ICue {
    eval(cfg: IEvalConfig): any;
}
declare class EvalConfig {
    cwd: string;
    all: boolean;
    concrete: boolean;
    expression: string[];
    force: boolean;
    help: boolean;
    inject: string[];
    name: string;
    out: string;
    outfile: string;
    "show-optional": boolean;
    "with-context": boolean;
    package: string;
    configuration: string;
}
interface IEvalConfig extends Partial<EvalConfig> {
}
export default class Cue {
    #private;
    constructor(g: IGlobal, go: IGo, src: WebAssembly.WebAssemblyInstantiatedSource);
    eval(cfg: IEvalConfig): void;
}
export declare function init(global: IGlobal, go: IGo): Promise<Cue>;
export {};
