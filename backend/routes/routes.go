package routes

import (
	"todo-backend/controllers"
	"todo-backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// Root route
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Todo App Backend API",
			"version": "1.0.0",
			"status":  "running",
		})
	})

	api := app.Group("/api")

	// Auth routes
	auth := api.Group("/auth")
	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)

	// Todo routes (protected)
	todos := api.Group("/todos", middleware.AuthRequired)
	todos.Get("/", controllers.GetTodos)
	todos.Post("/", controllers.CreateTodo)
	todos.Put("/:id", controllers.UpdateTodo)
	todos.Delete("/:id", controllers.DeleteTodo)
}