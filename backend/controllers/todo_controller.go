package controllers

import (
	"time"
	"todo-backend/config"
	"todo-backend/models"

	"github.com/gofiber/fiber/v2"
)

func GetTodos(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	var todos []models.Todo

	db := config.DB.Where("user_id = ?", userID)

	// Filter by status
	status := c.Query("status")
	if status == "completed" {
		db = db.Where("completed = ?", true)
	} else if status == "pending" {
		db = db.Where("completed = ?", false)
	}

	// Filter by priority
	priority := c.Query("priority")
	if priority != "" {
		db = db.Where("priority = ?", priority)
	}

	// Search by title or description
	search := c.Query("search")
	if search != "" {
		searchTerm := "%" + search + "%"
		db = db.Where("title LIKE ? OR description LIKE ?", searchTerm, searchTerm)
	}

	if err := db.Find(&todos).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	return c.JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	var input struct {
		Title       string     `json:"title"`
		Description string     `json:"description"`
		Tags        string     `json:"tags"`
		Priority    string     `json:"priority"`
		DueDate     *time.Time `json:"due_date"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if input.Title == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Title is required"})
	}

	if input.Priority == "" {
		input.Priority = "medium"
	}

	todo := models.Todo{
		Title:       input.Title,
		Description: input.Description,
		Tags:        input.Tags,
		Priority:    input.Priority,
		DueDate:     input.DueDate,
		UserID:      userID,
	}

	if err := config.DB.Create(&todo).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create todo"})
	}

	return c.Status(201).JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	todoID := c.Params("id")

	var todo models.Todo
	if err := config.DB.Where("id = ? AND user_id = ?", todoID, userID).First(&todo).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	var input struct {
		Title       string     `json:"title"`
		Description string     `json:"description"`
		Tags        string     `json:"tags"`
		Priority    string     `json:"priority"`
		DueDate     *time.Time `json:"due_date"`
		Completed   *bool      `json:"completed"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if input.Title != "" {
		todo.Title = input.Title
	}
	if input.Description != "" {
		todo.Description = input.Description
	}
	if input.Tags != "" {
		todo.Tags = input.Tags
	}
	if input.Priority != "" {
		todo.Priority = input.Priority
	}
	if input.DueDate != nil {
		todo.DueDate = input.DueDate
	}
	if input.Completed != nil {
		todo.Completed = *input.Completed
	}

	if err := config.DB.Save(&todo).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	return c.JSON(todo)
}

func DeleteTodo(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	todoID := c.Params("id")

	result := config.DB.Where("id = ? AND user_id = ?", todoID, userID).Delete(&models.Todo{})
	if result.RowsAffected == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo deleted successfully"})
}
