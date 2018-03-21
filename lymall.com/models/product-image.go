package models

// ProductImageModel pic
type ProductImageModel struct {
	Id   int    `gorm:"column:id;primary_key"` //主键编号
	Url  string `gorm:"column:url"`            //url
	Mime string `gorm:"column:mime"`           //mime
}

// TableName get table name
func (t ProductImageModel) TableName() string {
	return "product_images"
}
