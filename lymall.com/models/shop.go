package models

// ShopModel 商铺
type ShopModel struct {
	Id     string `gorm:"column:id;primary_key"` //商铺编号
	Name   string `gorm:"column:name"`           //shopname
	Appid  string `gorm:"column:appid"`          //appid
	Secret string `gorm:"column:secret"`         //secret
}

// TableName get table name
func (m ShopModel) TableName() string {
	return "shop"
}

type WechatSession struct {
	openid      string
	session_key string
	unionid     string
}

type WechatResponse struct {
	code int
	data *WechatSession
}
