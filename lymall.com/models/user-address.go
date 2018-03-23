package models

// UserAddressModel 收货地址模型
type UserAddressModel struct {
	Id            int    `gorm:"column:id;primary_key"` //编号
	Contact       string `gorm:"column:contact"`        //联系人
	Mobile        string `gorm:"column:mobile"`         //
	Province      string `gorm:"column:province"`       //
	ProvinceId    int    `gorm:"column:province_id"`    //
	City          string `gorm:"column:city"`           //
	CityId        int    `gorm:"column:city_id"`        //
	District      string `gorm:"column:district`        //
	DistrictId    int    `gorm:"column:district_id"`    //
	DetailAddress string `gorm:"column:detail_address"` //
	PostCode      string `gorm:"column:post_code"`      //
	IsDefault     bool   `gorm:"column:is_default"`     //
	OpenId        string `gorm:"column:open_id"`        //
}

// TableName 表名称
func (m UserAddressModel) TableName() string {
	return "user_address"
}
