import {IInstance} from 'go-wasm/src/1.17/webAssembly/instance'
import {IGlobalOut as IGlobalOutGo} from 'go-wasm/src/1.17/global'
import * as args_ from './cue/args'



export interface IResult {
    stdout: Uint8Array | null
    stderr: Uint8Array | null
}

export interface ICue {
    /** evaluate and print a configuration */
    eval(args: args_.Eval): Promise<IResult>

    /** run a user-defined shell command */
    cmd(args: args_.Cmd): Promise<IResult>

    /** print consolidated definitions */
    def(args: args_.Def): Promise<IResult>

    /** validate data */
    vet(args: args_.Vet): Promise<IResult>
}


interface IRunCfg {
    verb: string
    flags: string
    cwd?: string
    configuration?: string
}

export class Cue implements ICue {
    #module: WebAssembly.Module
    #instance: WebAssembly.Instance
    #global: IGlobalOutGo

    constructor(g: IGlobalOutGo, src: WebAssembly.WebAssemblyInstantiatedSource) {
        this.#global = g
        // this.#global.process = new Process(g, false)
        this.#module = src.module
        this.#instance = src.instance
    }

    #return(): IResult {
        return {
            stdout: this.#global.process.stdout.read(),
            stderr: this.#global.process.stderr.read(),
        }
    }

    async #root<T extends args_.Base>(verb: string | string[], args: T): Promise<IResult> {
        if (args.cwd) this.#global.process.chdir(args.cwd)
        this.#global.go.argv = args_.toCli(verb, args)
        await this.#global.go.run(this.#instance as IInstance)
        return this.#return()
    }

    async eval(args: args_.Eval) {
        return this.#root('eval', args)
    }

    async cmd(args: args_.Cmd): Promise<IResult> {
        return this.#root(['cmd', args.name], args)
    }

    async def(args: args_.Def): Promise<IResult> {
        return this.#root('def', args)
    }

    async vet(args: args_.Vet): Promise<IResult> {
        return this.#root('vet', args)
    }
}

export interface IGlobalOut extends IGlobalOutGo {
    cue: Cue
}

export default function install<G extends IGlobalOutGo>(global: G, src: WebAssembly.WebAssemblyInstantiatedSource): G & IGlobalOut {
    const g = global as G & IGlobalOut
    g.cue = new Cue(g, src)
    return g
}