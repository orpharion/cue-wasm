type primitive = boolean | string | string[] | undefined

export interface Flags {
    [key: string]: primitive
}

export interface Base extends Flags {
    /** help for verb */
    "help": boolean
}

export interface Global extends Flags {
    /** print all available errors */
    "all-errors": boolean
    /** proceed in the presence of errors */
    "ignore": boolean
    /** simplify output */
    "simplify": boolean
    /** report errors for lossy mappings */
    "strict": boolean
    /** trace computation */
    "trace": boolean
    /** print information about progress */
    "verbose": boolean
}

export interface Eval extends Partial<Base>, Partial<Global>, Flags {
    /** show optional and hidden fields */
    all?: boolean
    /** require the evaluation to be concrete */
    concrete?: boolean
    /** evaluate this expression only */
    expression?: string[]
    /** force overwriting existing files */
    force?: boolean
    /** set the value of a tagged field */
    inject?: string[]
    /** inject system variables in tags */
    'inject-vars': boolean
    /** concatenate multiple objects into a list */
    list: boolean
    /** merge non-CUE files (default true) */
    merge: boolean // todo what does this even mean? if it's a default true flag
    /** glob filter for non-CUE file names in directories */
    name?: string
    /** output format (run 'cue filetypes' for more info) */
    out?: string
    /** filename or - for stdout with optional file prefix (run 'cue filetypes' for more info) */
    outfile?: string
    /* package name for non-CUE files */
    package?: string
    /** CUE expression for single path component */
    path: string[]
    /** mode for rendering enums (int|json) (default "int") */
    proto_enum: string
    /** paths in which to search for imports */
    proto_path: string[]
    /** expression to select schema for evaluating values in non-CUE files */
    schema: string
    /** display field attributes */
    'show-attributes': boolean
    /** display hidden fields */
    'show-hidden': boolean
    /** display optional fields */
    "show-optional"?: boolean
    /** import as object with contextual data */
    "with-context"?: boolean
}

export interface Def extends Partial<Base>, Partial<Global>, Flags {
    /** evaluate this expression only */
    expression?: string[]
    /** force overwriting existing files */
    force?: boolean
    /** set the value of a tagged field */
    inject?: string[]
    /** inject system variables in tags */
    'inject-vars': boolean
    /** concatenate multiple objects into a list */
    list: boolean
    /** merge non-CUE files (default true) */
    merge: boolean // todo what does this even mean? if it's a default true flag
    /** glob filter for non-CUE file names in directories */
    name?: string
    /** output format (run 'cue filetypes' for more info) */
    out?: string
    /** filename or - for stdout with optional file prefix (run 'cue filetypes' for more info) */
    outfile?: string
    /* package name for non-CUE files */
    package?: string
    /** CUE expression for single path component */
    path: string[]
    /** mode for rendering enums (int|json) (default "int") */
    proto_enum: string
    /** paths in which to search for imports */
    proto_path: string[]
    /** expression to select schema for evaluating values in non-CUE files */
    schema: string
    /** display field attributes */
    'show-attributes': boolean
    /** import as object with contextual data */
    "with-context"?: boolean
}

export interface Vet extends Partial<Base>, Partial<Global>, Flags {
    /** require the evaluation to be concrete */
    concrete?: boolean
    /** set the value of a tagged field */
    inject?: string[]
    /** inject system variables in tags */
    'inject-vars': boolean
    /** concatenate multiple objects into a list */
    list: boolean
    /** merge non-CUE files (default true) */
    merge: boolean // todo what does this even mean? if it's a default true flag
    /** glob filter for non-CUE file names in directories */
    name?: string
    /* package name for non-CUE files */
    package?: string
    /** CUE expression for single path component */
    path: string[]
    /** mode for rendering enums (int|json) (default "int") */
    proto_enum: string
    /** paths in which to search for imports */
    proto_path: string[]
    /** expression to select schema for evaluating values in non-CUE files */
    schema: string
    /** import as object with contextual data */
    "with-context"?: boolean
}


export interface Cmd extends Partial<Base>, Partial<Global>, Flags {
    /** set the value of a tagged field */
    inject?: string[]
    /** don't inject system variables in tags */
    "dont-inject-vars"?: boolean
}

export function toCli(cfg: Flags): string[] {
    const prms = Object.entries(cfg)
    return prms.map(([k, v]) => {
        if (!!v && v !== "" && v !== [] && v !== undefined) {
            if (v === true) {
                return `--${k}`
            }
            if (typeof v === "string") {
                return `--${k}=${v}`
            }
            if (Array.isArray(v)) {
                return v.map(i => [`--${k}=${i}`])
            }
        }
    }).flat() as string[]
}