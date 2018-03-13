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

		m.Group("/category", func() {
			category := new(CategoryController)
			m.Get("", category.List)
			m.Post("", category.AddOne)
			m.Put(":id", category.UpdateOne)
			m.Delete(":ids", category.DeleteOnes)
		})
	})
}
