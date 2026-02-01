package handlers

import (
	"net/http"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func GetAbout(c *gin.Context) {
	about := models.GetAbout()
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    about,
	})
}
