package models

// CategoryModel 商品分类模型
type CategoryModel struct {
	Id   int    `gorm:"column:id;primary_key"`
	Name string `gorm:"column:name"`
}

// TableName 返回表名
func (m CategoryModel) TableName() string {
	return "category"
}
