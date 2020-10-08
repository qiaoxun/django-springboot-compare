package initialize

import (
	"go-demo/global"
	"go-demo/model"
	"github.com/jinzhu/gorm"
	"fmt"
	"os"
)

var err error

func Gorm() {
	if global.DB, err = gorm.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/go_demo?charset=utf8"); err != nil {
		os.Exit(0)
	} else {
		global.DB.SingularTable(true)
		GormDBTables(global.DB)
	}
}

// GormDBTables 注册数据库表专用
func GormDBTables(db *gorm.DB) {
	err := db.AutoMigrate(
		model.User{},
		model.Organization{},
	)
	if err != nil {
		fmt.Println("Error during migration")
		fmt.Println(err)
		// os.Exit(0)
	}
}
