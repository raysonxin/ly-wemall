package models

// PropertyModel 商品属性类型
type PropertyModel struct {
	Id        int    `gorm:"column:id;primary_key"` //属性编号
	Name      string `gorm:"column:name`            //属性类型
	ProductId int    `gorm:"column:product_id"`     //产品编号

	SubProperties []*PropertyValueModel `gorm:"-"` //属性值
}

// TableName return tablename
func (c PropertyModel) TableName() string {
	return "product_property"
}

// PropertyValueModel 属性值
type PropertyValueModel struct {
	Id         int    `gorm:"column:id;primary_key"` //属性值编号
	Name       string `gorm:"column:name"`           //属性值类型
	ProtertyId int    `gorm:"column:property_id"`    //所属属性
	ProductId  int    `gorm:"column:product_id"`     //产品编号
}

// TableName return table name
func (c PropertyValueModel) TableName() string {
	return "product_property_value"
}
