package main

import (
	"net/http"
	"senwork/handlers"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Enable CORS for frontend
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	// API Routes
	api := r.Group("/api")
	{
		// About endpoint
		api.GET("/about", handlers.GetAbout)

		// Skills endpoint
		api.GET("/skills", handlers.GetSkills)

		// Services endpoint
		api.GET("/services", handlers.GetServices)

		// Experience endpoint
		api.GET("/experience", handlers.GetExperience)

		// Contact endpoint
		api.POST("/contact", handlers.SubmitContact)
	}

	// Serve static files in production
	r.NoRoute(func(c *gin.Context) {
		if !models.IsDev() {
			c.File("../frontend/dist")
		}
	})

	r.Run(":8080")
}
