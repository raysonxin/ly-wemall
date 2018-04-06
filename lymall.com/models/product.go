package models

// ProductModel 商品基础信息实体
type ProductModel struct {
	Id         int    `gorm:"column:id;primary_key"` //商品编号
	Name       string `gorm:"column:name"`           //商品名称
	Cover      int    `gorm:"column:cover"`          //商品封面图片
	CoverUrl   string `gorm:"-"`                     //封面图片url
	Images     string `gorm:"column:images"`         //商品画册
	Status     int    `gorm:"column:status"`         //商品状态
	Price      int    `gorm:"column:price"`          //商品价格
	Content    string `gorm:"column:content"`        //详情展示
	CategoryId int    `gorm:"column:category_id"`    //所属分类编号
	Code       string `gorm:"column:code"`           //商品条形码
	ShopId     string `gorm:"column:shop_id"`        //所属商铺编号
}

// TableName get table name
func (m ProductModel) TableName() string {
	return "products"
}

// ProductDetailModel 商品详情
type ProductDetailModel struct {
	ProductModel
	HasProperty bool                 //是否有属性概念
	Gallery     []*ProductImageModel //商品画册
	Properties  []*PropertyModel     //属性信息
	Details     []*ProductImageModel //详细信息图片列表
}
