package router

import (
	"go-demo/api"
	"github.com/gin-gonic/gin"
)

func InitialUserRouters(Router *gin.Engine) {
	UserRouter := Router.Group("rbac")
	UserRouter.GET("/user/", api.ListUser)
	UserRouter.GET("/user/:id/", api.GetUser)
	UserRouter.POST("/user/", api.CreateUser)
	UserRouter.PUT("/user/:id/", api.UpdateUser)
	UserRouter.DELETE("/user/:id/", api.DeleteUser)
}

