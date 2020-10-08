package model

import (
	"github.com/jinzhu/gorm"
)

type Organization struct {
	gorm.Model
	Name string `json:"name" gorm:"column:name"`
	Type string `json:"type" gorm:"column:type"`
	Pid uint `json:"pid" gorm:"column:pid"`
}