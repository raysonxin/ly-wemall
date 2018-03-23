package v1

import (
	"net/http"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// UserAddressController 用户收货地址
type UserAddressController struct{}

// AddOne 添加地址
func (c *UserAddressController) AddOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.UserAddressModel)
	ctx.DbAddOne(one)
}

// UpdateOne 更新地址
func (c *UserAddressController) UpdateOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.UserAddressModel)
	ctx.DbUpdateOne(one, "id")
}

// SetDefault set user default address
func (c *UserAddressController) SetDefault(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Query("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	id := ctx.QueryInt("id")
	if id == 0 {
		ctx.Error(http.StatusBadRequest, "addr id can not be null")
		return
	}

	tx := db.Begin()
	err := tx.Table("user_address").Where("open_id=?", openId).Update("is_default", 0).Error
	if err != nil {
		tx.Rollback()
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	err = tx.Table("user_address").Where("open_id=? and id=?", openId, id).Update("is_default", 1).Error
	if err != nil {
		tx.Rollback()
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	tx.Commit()
	ctx.Success(http.StatusOK, "")
}

// Delete 删除
func (c *UserAddressController) Delete(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.UserAddressModel)
	ctx.DbDelete(one, "id")
}

// List 查询
func (c *UserAddressController) List(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Query("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	list := make([]*models.UserAddressModel, 0)
	err := db.Table("user_address").Where("open_id=?", openId).Scan(&list).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, list)
}

// GetDefault get default address
func (c *UserAddressController) GetDefault(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Query("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	var one models.UserAddressModel
	err := db.Table("user_address").Where("open_id=? and is_default=1", openId).First(&one).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, one)
}

// GetById get address info by the primary key
func (c *UserAddressController) GetById(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Params("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	id := ctx.ParamsInt("id")
	if id == 0 {
		ctx.Error(http.StatusBadRequest, "id can not be null")
		return
	}

	var one models.UserAddressModel
	err := db.Table("user_address").Where("id=? and open_id=?", id, openId).First(&one).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, one)
}
