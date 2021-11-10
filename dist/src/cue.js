var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmd/cue/cue.wasm-base64", "./pkg/base64", "go-wasm/src/1.17/process"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _Cue_module, _Cue_instance, _Cue_go, _Cue_global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    const cue_wasm_base64_1 = require("./cmd/cue/cue.wasm-base64");
    const base64_1 = require("./pkg/base64");
    const process_1 = require("go-wasm/src/1.17/process");
    let cueWasmBytes = (0, base64_1.base64DecToArr)(cue_wasm_base64_1.default);
    //  -a, --all                      show optional and hidden fields
    //   -c, --concrete                 require the evaluation to be concrete
    //   -e, --expression stringArray   evaluate this expression only
    //   -f, --force                    force overwriting existing files
    //   -h, --help                     help for eval
    //   -t, --inject stringArray       set the value of a tagged field
    //   -T, --inject-vars              inject system variables in tags
    //       --list                     concatenate multiple objects into a list
    //       --merge                    merge non-CUE files (default true)
    //   -n, --name string              glob filter for non-CUE file names in directories
    //       --out string               output format (run 'cue filetypes' for more info)
    //   -o, --outfile string           filename or - for stdout with optional file prefix (run 'cue filetypes' for more info)
    //   -p, --package string           package name for non-CUE files
    //   -l, --path stringArray         CUE expression for single path component
    //       --proto_enum string        mode for rendering enums (int|json) (default "int")
    //   -I, --proto_path stringArray   paths in which to search for imports
    //   -d, --schema string            expression to select schema for evaluating values in non-CUE files
    //   -A, --show-attributes          display field attributes
    //   -H, --show-hidden              display hidden fields
    //   -O, --show-optional            display optional fields
    //       --with-context             import as object with contextual data
    //
    // Global Flags:
    //   -E, --all-errors   print all available errors
    //   -i, --ignore       proceed in the presence of errors
    //   -s, --simplify     simplify output
    //       --strict       report errors for lossy mappings
    //       --trace        trace computation
    //   -v, --verbose      print information about progress
    class EvalConfig {
        constructor() {
            this.cwd = "/";
            /* show optional and hidden fields */
            this.all = false;
            this.concrete = false;
            this.expression = [];
            this.force = false;
            this.help = false;
            this.inject = [];
            this.name = "";
            this.out = "";
            this.outfile = "";
            this["show-optional"] = false;
            this["with-context"] = false;
            /* package name for non-CUE files */
            this.package = "";
            //   -l, --path stringArray         CUE expression for single path component
            //       --proto_enum string        mode for rendering enums (int|json) (default "int")
            //   -I, --proto_path stringArray   paths in which to search for imports
            //   -d, --schema string            expression to select schema for evaluating values in non-CUE files
            //   -A, --show-attributes          display field attributes
            //   -H, --show-hidden              display hidden fields
            //   -O, --show-optional            display optional fields
            //       --with-context             import as object with contextual data
            //   -E, --all-errors   print all available errors
            //   -i, --ignore       proceed in the presence of errors
            //   -s, --simplify     simplify output
            //       --strict       report errors for lossy mappings
            //       --trace        trace computation
            //   -v, --verbose      print information about progress
            this.configuration = "";
        }
    }
    function flagsToCli(cfg) {
        const prms = Object.entries(cfg);
        const flags = prms.filter((v => (v[0] !== "configuration" && v[0] !== "cwd")));
        return flags.map(([k, v]) => {
            if (!!v && v !== "" && v !== []) {
                if (v === true) {
                    return `--${k}`;
                }
                if (typeof v === "string") {
                    return `--${k}=${v}`;
                }
                if (Array.isArray(v)) {
                    return v.map(i => [`--${k}=${i}`]);
                }
            }
        }).flat();
    }
    function runCfgToString(cfg) {
        return `${cfg.verb} ${cfg.flags}`;
    }
    class Cue {
        constructor(g, go, src) {
            _Cue_module.set(this, void 0);
            _Cue_instance.set(this, void 0);
            _Cue_go.set(this, void 0);
            _Cue_global.set(this, void 0);
            __classPrivateFieldSet(this, _Cue_global, g, "f");
            __classPrivateFieldGet(this, _Cue_global, "f").process = new process_1.default(g, false);
            __classPrivateFieldSet(this, _Cue_module, src.module, "f");
            __classPrivateFieldSet(this, _Cue_instance, src.instance, "f");
            __classPrivateFieldSet(this, _Cue_go, go, "f");
        }
        eval(cfg) {
            const flags = flagsToCli(cfg);
            if (cfg.cwd)
                __classPrivateFieldGet(this, _Cue_go, "f").env['PWD'] = cfg.cwd;
            __classPrivateFieldGet(this, _Cue_go, "f").argv = ['eval', ...flags];
            if (cfg.configuration)
                __classPrivateFieldGet(this, _Cue_go, "f").argv.push(cfg.configuration);
            __classPrivateFieldGet(this, _Cue_go, "f").run(__classPrivateFieldGet(this, _Cue_instance, "f"));
            __classPrivateFieldGet(this, _Cue_global, "f").process.stdout;
        }
    }
    exports.default = Cue;
    _Cue_module = new WeakMap(), _Cue_instance = new WeakMap(), _Cue_go = new WeakMap(), _Cue_global = new WeakMap();
    function init(global, go) {
        return WebAssembly.instantiate(cueWasmBytes, go.importObject)
            .then(src => { return new Cue(global, go, src); });
    }
    exports.init = init;
});
