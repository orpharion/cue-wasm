import *  as flags_ from './flags'

export interface Base {
    /** directory to run cue. Empty directory implies current working directory */
    cwd?: string
    input?: string[]
    flags?: flags_.Flags
}


export interface Eval extends Base {
    flags?: flags_.Eval
}

export interface Cmd extends Base {
    /** the named command to execute */
    name: string
    flags?: flags_.Cmd
}

export interface Def extends Base {
    flags?: flags_.Def
}

export interface Vet extends Base {
    flags?: flags_.Vet
}

export function toCli<T extends Base>(verb: string | string[], args: T) {
    const flags = args.flags ? flags_.toCli(args.flags) : []
    const v = typeof verb === "string" ? [verb] : verb
    const argv = ['cue', ...v, ...flags]
    if (args.input) argv.push(...args.input)
    return argv
}
// completion  Generate completion script

// export      output data in a standard format
// fix         rewrite packages to latest standards
// fmt         formats CUE configuration files
// get         add dependencies to the current module
// help        Help about any command
// import      convert other formats to CUE files
// mod         module maintenance
// trim        remove superfluous fields
// version     print CUE version
// vet         validate data