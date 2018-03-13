package httpserver

import (
	"ly-wemall/lymall.com/httpserver/v1"
)

// RegisterRouter register http router
func (svr *HTTPServer) RegisterRouter() {
	v1.RegisterRoutes(svr.ctx)
}
