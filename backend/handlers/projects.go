package handlers

import (
	"net/http"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func GetServices(c *gin.Context) {
	services := models.GetServices()
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    services,
	})
}
