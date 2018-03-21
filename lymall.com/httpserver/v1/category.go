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
	shop := ctx.Query("shop")
	if shop == "" {
		ctx.Error(http.StatusUnauthorized, "your request is invalid")
		return
	}

	list := make([]*models.CategoryModel, 0)
	err := db.Table("category").Where("shop_id=?", shop).Scan(&list).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, list)
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
