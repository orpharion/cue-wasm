(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmd/cue/cue.wasm-base64", "./base64"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    const cue_wasm_base64_1 = require("./cmd/cue/cue.wasm-base64");
    const base64_1 = require("./base64");
    let cueWasmBytes = (0, base64_1.base64DecToArr)(cue_wasm_base64_1.default);
    for (let i = 0; i < 50; i++) {
        console.log(cueWasmBytes[i].toString(16));
    }
    function init() {
    }
    exports.init = init;
});
