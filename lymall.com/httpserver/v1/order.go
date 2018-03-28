package v1

import (
	"net/http"
	"strconv"
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
	one.OrderNo = strconv.FormatInt(time.Now().Unix(), 10)
	one.CreateTime = models.JsonTime(time.Now()) //time.Now()
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

// List get user order list
func (c *OrderController) List(ctx *httpctx.HTTPCtx, db *gorm.DB) {
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

	orders := make([]*models.OrderModel, 0)
	err := db.Table("orders").Where("open_id=? and shop_id=?", openId, shopId).Order("create_time desc").Scan(&orders).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	for _, o := range orders {
		goods := make([]*models.OrderGoods, 0)
		err = db.Table("order_goods").Where("order_id=?", o.Id).Scan(&goods).Error
		if err != nil {
			continue
		}
		o.OrderGoods = goods
	}

	ctx.Success(http.StatusOK, orders)
}

func (c *OrderController) GetOne(ctx *httpctx.HTTPCtx, db *gorm.DB) {
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

	orderId := ctx.QueryInt("order")
	if orderId == 0 {
		ctx.Error(http.StatusBadRequest, "order id  can not be null")
		return
	}

	var one models.OrderModel
	err := db.Table("orders").Where("open_id=? and shop_id=? and id=?", openId, shopId, orderId).Order("create_time desc").First(&one).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	goods := make([]*models.OrderGoods, 0)
	err = db.Table("order_goods").Where("order_id=?", one.Id).Scan(&goods).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
	}
	one.OrderGoods = goods

	ctx.Success(http.StatusOK, one)
}
