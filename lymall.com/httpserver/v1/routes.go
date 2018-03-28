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

		basic := new(BasicController)
		category := new(CategoryController)
		product := new(ProductController)
		cart := new(ShopCartController)
		address := new(UserAddressController)
		order := new(OrderController)

		m.Group("/shop", func() {
			m.Get("/visitor", basic.GetUserInfo)

			m.Get("/category", category.List)
			m.Group("/goods", func() {
				m.Get("", product.List)
				m.Get("/:id", product.GetDetail)
				m.Get("/tj", product.GetRecommand)
			})
			m.Group("/cart", func() {
				m.Post("", cart.AddOne)
				m.Get("/count", cart.GetGoodsCountByUser)
				m.Get("", cart.GetShopCart)
			})
			m.Group("/my", func() {
				m.Group("/addr", func() {
					m.Get("", address.List)
					m.Get("/default", address.GetDefault)
					m.Get("/:id/:user", address.GetById)
					m.Get("/setdefault", address.SetDefault)
					m.Post("", address.AddOne)
					m.Put("/:id", address.UpdateOne)
					m.Delete("/:ids", address.Delete)
				})
			})
			m.Group("/order", func() {
				m.Post("", order.AddOne)
				m.Get("", order.List)
				m.Get("/detail", order.GetOne)
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
