package initialize

import (
	"go-demo/router"
	// "go-demo/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"fmt"
)

func Routers() *gin.Engine {
	fmt.Println("Initialize Routers")
	r := gin.Default()
	corsConf := cors.DefaultConfig()
	corsConf.AddAllowHeaders("Authorization")
	corsConf.AllowAllOrigins = true
	r.Use(cors.New(corsConf))

	router.InitialOrganizationRouters(r)
	router.InitialUserRouters(r)
	return r
}