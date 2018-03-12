package main

import (
	"fmt"
	"runtime"

	"ly-wemall/lymall.com/httpserver"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	svr := httpserver.New()
	// config := &service.Config{
	// 	Name:        "http-server",
	// 	DisplayName: "http-server",
	// 	Description: "http-server",
	// }

	// p,err:=
	svr.Start()

	fmt.Print("Hello World!")
}
