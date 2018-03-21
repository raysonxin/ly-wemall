package models

// ShopCartModel 购物车实体
type ShopCartModel struct {
	Id          int    `gorm:"column:id;primary_key"` //主键编号
	OpenId      string `gorm:"column:open_id"`        //用户微信openid
	ProductId   int    `gorm:"column:product_id"`     //产品编号
	ProductName string `gorm:"column:product_name"`   //产品名称
	Count       int    `gorm:"column:count"`          //数量
	Image       string `gorm:"column:image"`          //产品图片
	Price       int    `gorm:"column:price"`          //产品价格
	PpvBrief    string `gorm:"column:ppv_brief"`      //产品属性描述
	PpvIds      string `gorm:"column:ppv_ids"`        //产品属性id列表
	StockId     int    `gorm:"column:stock_id"`       //库存单品编号
	ShopId      string `gorm:"column:shop_id"`        //所属商店编号
}

// TableName 获取表名称
func (m ShopCartModel) TableName() string {
	return "shop_cart"
}
