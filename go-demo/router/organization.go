package router

import (
	"go-demo/api"
	"github.com/gin-gonic/gin"
)

func InitialOrganizationRouters(Router *gin.Engine) {
	OrganizationRouter := Router.Group("rbac")
	OrganizationRouter.GET("/org/", api.ListOrganization)
	OrganizationRouter.GET("/org/:id/", api.GetOrganization)
	OrganizationRouter.POST("/org/", api.CreateOrganization)
	OrganizationRouter.PUT("/org/:id/", api.UpdateOrganization)
	OrganizationRouter.DELETE("/org/:id/", api.DeleteOrganization)
}