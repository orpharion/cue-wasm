(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/cue", "go-wasm/src/1.17/global", "go-wasm/src/1.17/process", "go-wasm/src/1.17/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const cue_1 = require("../src/cue");
    const global_1 = require("go-wasm/src/1.17/global");
    const process_1 = require("go-wasm/src/1.17/process");
    const go_1 = require("go-wasm/src/1.17/go");
    let gl = {};
    gl.process = new process_1.default(gl, false);
    gl = (0, global_1.transfer)(globalThis, gl);
    const go = new go_1.default(gl);
    const cuePromise = (0, cue_1.init)(gl, go);
    exports.default = cuePromise;
});
