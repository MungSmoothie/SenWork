package handlers

import (
	"net/http"
	"senwork/models"

	"github.com/gin-gonic/gin"
)

func SubmitContact(c *gin.Context) {
	var form models.ContactForm

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "请填写完整的联系信息",
			"error":   err.Error(),
		})
		return
	}

	// Here you would typically send an email or save to database
	// For demo purposes, we'll just return success

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "感谢您的留言，我会尽快回复您！",
	})
}
