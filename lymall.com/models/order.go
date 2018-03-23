package models

import "time"

// OrderModel 订单模型
type OrderModel struct {
	Id         int       `gorm:"column:id;primary_key"`
	ShopId     string    `gorm:"column:shop_id"`
	OpenId     string    `gorm:"column:open_id"`
	GoodsCount int       `gorm:"column:goods_count"`
	TotalPrice int       `gorm:"column:total_price"`
	Payment    int       `gorm:"column:payment"`
	Address    string    `gorm:"column:address"`
	Contact    string    `gorm:"column:contact"`
	Mobile     string    `gorm:"column:mobile"`
	Remark     string    `gorm:"column:remark"`
	CreateTime time.Time `gorm:"column:create_time"`
	Status     int       `gorm:"column:status"`

	OrderGoods []OrderGoods `gorm:"-"`
}

// TableName 表名
func (m OrderModel) TableName() string {
	return "orders"
}

// OrderGoods 订单商品实体
type OrderGoods struct {
	Id          int    `gorm:"column:id;primary_key"` //主键编号
	ProductId   int    `gorm:"column:product_id"`     //产品编号
	ProductName string `gorm:"column:product_name"`   //产品名称
	Count       int    `gorm:"column:count"`          //数量
	Image       string `gorm:"column:image"`          //产品图片
	Price       int    `gorm:"column:price"`          //产品价格
	PpvBrief    string `gorm:"column:ppv_brief"`      //产品属性描述
	PpvIds      string `gorm:"column:ppv_ids"`        //产品属性id列表
	OrderId     int    `gorm:"column:order_id"`       //订单编号
}

// TableName 获取表名称
func (m OrderGoods) TableName() string {
	return "order_goods"
}
