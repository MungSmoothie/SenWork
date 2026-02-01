package handlers

import (
	"net/http"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func GetSkills(c *gin.Context) {
	skills := models.GetSkills()
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    skills,
	})
}
