cd ../../src

export GOROOT=~/go/go1.17
export GOOS=js
export GOARCH=wasm
export TINYGOROOT=/home/orpharion/Documents/github.com/orpharion/cue-wasm/external/github.com/tinygo-org/tinygo

tinygo build -o cue.wasm ./cmd/cue
