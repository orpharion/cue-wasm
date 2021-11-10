package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	src := os.Args[1]
	dst := os.Args[2]
	b, err := ioutil.ReadFile(src)
	if err != nil {
		panic(err)
	}
	enc := base64.StdEncoding.EncodeToString(b)
	enc = fmt.Sprintf("const cueWasmBase64 = \"%s\"\n export default cueWasmBase64", enc)
	err = ioutil.WriteFile(dst, []byte(enc), 0664)
	if err != nil {
		panic(err)
	}
}
