package api

import (
	"go-demo/model"
	"go-demo/utils"
	"go-demo/global"
	"github.com/gin-gonic/gin"
	"fmt"
)

type OrganizationResult struct {
	ID uint `json:"id" gorm:"column:id"`
	Name string `json:"name" gorm:"column:name"`
	Type string `json:"type" gorm:"column:type"`
	TypeMeaning string `json:"type_meaning" gorm:"column:type_meaning"`
	Parent string `json:"parent" gorm:"column:parent"`
}

func ListOrganization(c *gin.Context) {
	var pageinfo utils.PageInfo
	_ = c.ShouldBindQuery(&pageinfo)
	offset := (pageinfo.Page - 1) * pageinfo.Size
	var results []OrganizationResult
	global.DB.Limit(pageinfo.Size).Offset(offset).Model(&model.Organization{}).Select("organization.id, organization.name, organization.type, organization.pid, if(organization.type='company', 'Company', 'Department') type_meaning, parentorg.name parent ").Joins("left join organization parentorg on organization.pid = parentorg.id").Scan(&results)
	var count int
	global.DB.Model(&model.Organization{}).Count(&count)

	c.JSON(200, gin.H{
		"count": count,
		"results": results,
	})
}

func GetOrganization(c *gin.Context) {
	id := c.Param("id")
	var organization model.Organization
	err := global.DB.First(&organization, "id = ?", id)
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"Organization": organization})
	}
}

func CreateOrganization(c *gin.Context) {
	var organization model.Organization
	_ = c.ShouldBindJSON(&organization)
	fmt.Println(organization)
	err := global.DB.Create(&organization).Error
		if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}

func UpdateOrganization(c *gin.Context) {
	// id := c.Param("id")
	var organization model.Organization
	_ = c.ShouldBindJSON(&organization)
	err := global.DB.Save(&organization).Error
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}

func DeleteOrganization(c *gin.Context) {
	id := c.Param("id")
	err := global.DB.Delete(&model.Organization{}, id).Error
	if err != nil {
		c.JSON(500, gin.H{"Error": err})
	} else {
		c.JSON(200, gin.H{"success": true})
	}
}