package main

import (
	"go-demo/initialize"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

func main() {
	initialize.Gorm()
	r := initialize.Routers()

	fmt.Println("server is running at 9007")
	r.Run(":9007")
}