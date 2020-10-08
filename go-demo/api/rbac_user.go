package api

import (
	"go-demo/model"
	"go-demo/utils"
	"go-demo/global"
	"github.com/gin-gonic/gin"
)

type UserResult struct {
	ID uint `json:"id"`
	Name string `json:"name"`
	FirstName string `json:"first_name"`
	LastName string `json:"last_name"`
	Email string `json:"email"`
	Password string `json:"password"`
	OrganizationId uint `json:"organization_id"`
	OrganizationName string `json:"organization_name"`
}

func ListUser(c *gin.Context) {
	var pageinfo utils.PageInfo
	organizationId := c.Query("organization")
	_ = c.ShouldBindQuery(&pageinfo)
	offset := (pageinfo.Page - 1) * pageinfo.Size
	var results []UserResult
	global.DB.Limit(pageinfo.Size).Offset(offset).Model(&model.User{}).Select("user.id, user.name, user.first_name, user.last_name, user.email, user.password, user.organization_id, organization.name as organization_name").Joins("left join organization on user.organization_id = organization.id").Where("organization_id = ?", organizationId).Scan(&results)

	var count int
	global.DB.Model(&model.User{}).Where("organization_id = ?", organizationId).Count(&count)

	c.JSON(200, gin.H{
		"count": count,
		"results": results,
	})
}

func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user model.User
	err := global.DB.First(&user, "id = ?", id)
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"User": user})
	}
}

func CreateUser(c *gin.Context) {
	var user model.User
	_ = c.ShouldBindJSON(&user)
	err := global.DB.Create(&user).Error
		if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}

func UpdateUser(c *gin.Context) {
	// id := c.Param("id")
	var user model.User
	_ = c.ShouldBindJSON(&user)
	err := global.DB.Save(&user).Error
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	err := global.DB.Delete(&model.User{}, id).Error
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}