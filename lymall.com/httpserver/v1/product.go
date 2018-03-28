package v1

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// ProductController goods
type ProductController struct {
}

// List get goods list by shop and category with page info
func (c *ProductController) List(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	fmt.Println("1")
	shop := ctx.Query("shop")
	if shop == "" {
		ctx.Error(http.StatusUnauthorized, "your request is invalid")
		return
	}
	where := fmt.Sprintf("c.shop_id='%s'", shop)

	catId := ctx.QueryInt("category")
	if catId != 0 {
		where = fmt.Sprintf("%s and pc.category_id=%d", where, catId)
	}

	keywords := ctx.Query("keywords")
	if keywords != "" {
		where = fmt.Sprintf("%s and p.name like '%%%s%%'", where, keywords)
	}

	products := make([]*models.ProductModel, 0)
	var total int64

	sql := fmt.Sprintf(`(SELECT distinct p.* FROM product_category pc join category c on pc.category_id=c.id join products p on p.id=pc.product_id WHERE
			(%s)) a`, where)
	err := db.Table(sql).Count(&total).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	limit, offset, pageInfo := ctx.QueryPageInfo(int(total))

	err = db.Select("distinct p.id,p.name,p.price,p.cover,p.status,pi.url cover_url").Table("product_category pc").
		Joins("join category c on pc.category_id=c.id").
		Joins("join products p on p.id=pc.product_id").
		Joins("join product_images pi on pi.id=p.cover").
		Where(where).
		Limit(limit).
		Offset(offset).
		Scan(&products).
		Error

	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	ctx.SuccessPage(http.StatusOK, products, pageInfo)
}

// GetRecommand get recommand godds
func (c *ProductController) GetRecommand(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	shop := ctx.Query("shop")
	if shop == "" {
		ctx.Error(http.StatusUnauthorized, "your request is invalid")
		return
	}

	goods := make([]*models.ProductModel, 0)
	err := db.Select("products.*,pi.url as cover_url").Table("products").
		Joins("join product_category pc on products.id=pc.product_id").
		Joins("join category cat on cat.id=pc.category_id").
		Joins("join product_images pi on pi.id=products.cover").
		Where("cat.shop_id=? and status=2", shop).
		Limit(5).Scan(&goods).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	ctx.Success(http.StatusOK, goods)
}

// GetDetail get goods detail information
func (c *ProductController) GetDetail(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	fmt.Println("2")
	productId := ctx.ParamsInt("id")
	if productId == 0 {
		ctx.Error(http.StatusBadRequest, "goods is can not be null")
		return
	}

	var one models.ProductDetailModel
	err := db.Select("products.*,pi.url cover_url").
		Table("products").
		Joins("join product_images pi on pi.id=products.cover").Where("products.id=?", productId).First(&one).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	imgIds := make([]*int, 0)
	err = json.Unmarshal([]byte(one.Images), &imgIds)
	if err == nil {
		images := make([]*models.ProductImageModel, 0)
		err = db.Table("product_images").Where("id in (?)", imgIds).Scan(&images).Error
		if err != nil {
			ctx.Error(http.StatusBadRequest, err.Error())
			return
		}

		one.Gallery = images
	} else {
		fmt.Println("err=", err.Error())
	}

	var ppCount int64
	err = db.Table("product_property").Where("product_id=?", productId).Count(&ppCount).Error
	if err != nil || ppCount == 0 {
		one.HasProperty = false
	} else {
		one.HasProperty = true
	}

	properties := make([]*models.PropertyModel, 0)
	err = db.Table("product_property").Where("product_id=?", productId).Scan(&properties).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	for _, v := range properties {
		v.SubProperties = make([]*models.PropertyValueModel, 0)
		err = db.Table("product_property_value").Where("property_id=?", v.Id).Scan(&v.SubProperties).Error
		if err != nil {
			ctx.Error(http.StatusBadRequest, err.Error())
			return
		}
	}

	one.Properties = properties
	ctx.Success(http.StatusOK, one)
}
