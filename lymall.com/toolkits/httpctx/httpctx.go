package httpctx

import (
	"gopkg.in/macaron.v1"
)

// HTTPCtx custom http context
type HTTPCtx struct {
	*macaron.Context
}

// Context custom http context method
func Context() macaron.Handler {
	return func(ctx *macaron.Context) {
		ctx.Header().Add("X-Powered-By", "Golang/1.9.0")
		ctx.Header().Add("Access-Control-Allow-Origin", "*")
		myCtx := &HTTPCtx{
			Context: ctx,
		}
		ctx.Map(myCtx)
	}
}

// MapCustom inject custom objects
func MapCustom(m *macaron.Macaron, args ...interface{}) macaron.Handler {
	for _, v := range args {
		m.Map(v)
	}

	return func(c *macaron.Context) {

	}
}

// Error reponse error message
func (ctx *HTTPCtx) Error(code int, msg string) {
	if code == 0 {
		code = 400
	}
	ctx.JSON(code, map[string]string{"Error": msg})
}


