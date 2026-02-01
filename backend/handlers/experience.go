package handlers

import (
	"net/http"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func GetExperience(c *gin.Context) {
	experience := models.GetExperience()
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    experience,
	})
}
