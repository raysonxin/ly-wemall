package v1

import (
	"net/http"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// CategoryController goods category controller
type CategoryController struct {
}

// List Get goods category list
func (c *CategoryController) List(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	list := make([]*models.CategoryModel, 0)
	err := db.Table("category").Scan(&list).Error
	if err != nil {
		ctx.Error(400, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{"data": list})
}

// AddOne add one category record
func (c *CategoryController) AddOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.CategoryModel)
	ctx.DbAddOne(one)
}

// UpdateOne update category
func (c *CategoryController) UpdateOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.CategoryModel)
	ctx.DbUpdateOne(one, "id")
}

// DeleteOnes delete category
func (c *CategoryController) DeleteOnes(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.CategoryModel)
	ctx.DbDelete(one, "id")
}
