package middleware

import (
	"strings"
	"todo-backend/utils"

	"github.com/gofiber/fiber/v2"
)

func AuthRequired(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(401).JSON(fiber.Map{
			"error": "Missing authorization header",
		})
	}

	tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"error": "Invalid or expired token",
		})
	}

	c.Locals("userID", claims.UserID)
	return c.Next()
}