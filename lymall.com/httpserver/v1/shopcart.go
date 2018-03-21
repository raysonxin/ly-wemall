package v1

import (
	"fmt"
	"net/http"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// ShopCartController 购物车操作控制器
type ShopCartController struct{}

// AddOne 添加购物车
func (c *ShopCartController) AddOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.ShopCartModel)
	err := ctx.CheckFormData(one)
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	exist := new(models.ShopCartModel)
	err = db.Table("shop_cart").Where("open_id=? and product_id=? and ppv_ids=?", one.OpenId, one.ProductId, one.PpvIds).First(&exist).Error
	if err != nil {

		err = db.Table("shop_cart").Create(one).Error
		if err != nil {
			ctx.Error(http.StatusBadRequest, err.Error())
			return
		}
		ctx.Success(http.StatusOK, one)
		return
	}

	err = db.Model(&exist).Update("count", gorm.Expr("count+?", one.Count)).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	ctx.Success(http.StatusOK, exist)

}

// GetGoodsCountByUser 获取购物车商品数量
func (c *ShopCartController) GetGoodsCountByUser(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Query("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	shopId := ctx.Query("shop")
	if shopId == "" {
		ctx.Error(http.StatusBadRequest, "shop info can not be null")
		return
	}

	//err:=db.Table("shop_cart").Where("shop_id=? and open_id=?",shopId,openId).
	sql := fmt.Sprintf(`select ifnull(sum(count),0) as total from shop_cart where shop_id='%s' and open_id='%s'`, shopId, openId)
	type Result struct {
		Total int64
	}

	var result Result

	err := db.Raw(sql).Scan(&result).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, map[string]interface{}{"Total": result.Total})
}

// GetShopCart 获取用户购物车商品信息
func (c *ShopCartController) GetShopCart(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	openId := ctx.Query("user")
	if openId == "" {
		ctx.Error(http.StatusBadRequest, "user info can not be null")
		return
	}

	shopId := ctx.Query("shop")
	if shopId == "" {
		ctx.Error(http.StatusBadRequest, "shop info can not be null")
		return
	}

	carts := make([]*models.ShopCartModel, 0)
	err := db.Table("shop_cart").Where("shop_id=? and open_id=?", shopId, openId).Scan(&carts).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, carts)
}
