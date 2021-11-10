import {init, ICue} from "../../src/cue"
import {IGlobal, transfer} from 'go-wasm/src/1.17/global'
import Process from 'go-wasm/src/1.17/process'
import Go from 'go-wasm/src/1.17/go'

let gl = {} as IGlobal
gl.process = new Process(gl, false)
gl = transfer(globalThis, gl)
const go = new Go(gl)
const cuePromise: Promise<ICue> = init(gl, go)
export default cuePromise