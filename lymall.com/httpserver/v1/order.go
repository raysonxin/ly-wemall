package v1

import (
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// OrderController 订单控制器
type OrderController struct {
}

// AddOne 创建订单
func (c *OrderController) AddOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	one := new(models.OrderModel)
	err := ctx.CheckFormData(one)
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	one.CreateTime = time.Now()
	tx := db.Begin()
	err = tx.Create(&one).Error
	if err != nil {
		tx.Rollback()
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	for _, goods := range one.OrderGoods {
		goods.OrderId = one.Id
		err = tx.Create(&goods).Error
		if err != nil {
			break
		}
	}

	if err != nil {
		tx.Rollback()
		ctx.Error(http.StatusBadRequest, err.Error())

	} else {
		tx.Commit()
		ctx.Success(http.StatusOK, "")
	}
	//exist := new(models.ShopCartModel)
}
