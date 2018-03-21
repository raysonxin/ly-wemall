package models

// CategoryModel 商品分类模型
type CategoryModel struct {
	Id     int    `gorm:"column:id;primary_key"`
	Name   string `gorm:"column:name"`
	ShopId string `gorm:"column:shop_id"`
}

// TableName 返回表名
func (m CategoryModel) TableName() string {
	return "category"
}
