package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Title       string     `gorm:"not null" json:"title"`
	Description string     `json:"description"`
	Tags        string     `json:"tags"`                             // Comma separated tags
	Priority    string     `gorm:"default:'medium'" json:"priority"` // low, medium, high
	DueDate     *time.Time `json:"due_date"`
	Completed   bool       `gorm:"default:false" json:"completed"`
	UserID      uint       `gorm:"not null" json:"user_id"`
}
