#!/bin/bash

wd=$(dirname "$0")
cd "$wd"/../src || exit

export GOOS=js
export GOARCH=wasm
go build -o ../dist/bin/cue.wasm ./cmd/cue
#mv ./cmd/cue/cue.wasm ../web/src/global/cue/