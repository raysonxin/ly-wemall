package v1

import (
	"gopkg.in/macaron.v1"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// RegisterRoutes register routers
func RegisterRoutes(m *macaron.Macaron) {
	m.Group("/v1", func() {
		m.Options("/*", func(ctx *httpctx.HTTPCtx) {
			ctx.Header().Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE")
			ctx.Header().Add("Access-Control-Allow-Header", "Qsc-Token,Content-TYpe")
		})

		category := new(CategoryController)
		product := new(ProductController)
		cart := new(ShopCartController)
		m.Group("/shop", func() {
			m.Get("/category", category.List)
			m.Group("/goods", func() {
				m.Get("", product.List)
				m.Get("/:id", product.GetDetail)
			})
			m.Group("/cart", func() {
				m.Post("", cart.AddOne)
				m.Get("/count", cart.GetGoodsCountByUser)
				m.Get("", cart.GetShopCart)
			})
		})

		m.Group("/admin", func() {
			m.Group("/category", func() {
				m.Get("", category.List)
				m.Post("", category.AddOne)
				m.Put(":id", category.UpdateOne)
				m.Delete(":ids", category.DeleteOnes)
			})
		})

	})
}
