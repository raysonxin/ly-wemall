package httpserver

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"gopkg.in/macaron.v1"
	"ly-wemall/lymall.com/toolkits/httpctx"
	"ly-wemall/lymall.com/toolkits/mysql"
	"ly-wemall/lymall.com/utils"
)

// HTTPServer definination
type HTTPServer struct {
	config *utils.ServiceCfg // http configuration
	ctx    *macaron.Macaron  // http context
	mysql  *mysql.DB         // mysql db object
}

// New create a new http server
func New() *HTTPServer {
	// set log to show file and row number
	log.SetFlags(log.Lshortfile | log.LstdFlags)

	//load configuration
	conf, err := utils.NewServiceCfg("")
	if err != nil {
		log.Panicln("failed to read config file", err)
	}

	db, err := mysql.New(conf.Mysql)
	if err != nil {
		log.Panicln("connect to mysql failed")
	}

	ctx := macaron.New()
	ctx.Use(macaron.Logger())
	ctx.Use(macaron.Recovery())
	ctx.Use(httpctx.Context())

	ctx.Use(macaron.Static(utils.GetRootDir()+"public",
		macaron.StaticOptions{
			Prefix:      "", //
			SkipLogging: true,
			IndexFile:   "index.html",
			Expires: func() string {
				return time.Now().Add(24 * 60 * time.Minute).UTC().Format("Mon, 02 Jan 2006 15:04:05 GMT")
			},
		}))

	ctx.Use(macaron.Renderer(macaron.RenderOptions{
		Directory:       "templates",
		Extensions:      []string{".tmpl", "html"},
		Delims:          macaron.Delims{"{{", "}}"},
		Charset:         "UTF-8",
		HTMLContentType: "text/html",
	}))

	ctx.Use(httpctx.MapCustom(ctx, db.GetMySQLDB()))

	return &HTTPServer{
		config: conf,
		mysql:  db,
		ctx:    ctx,
	}
}

// Start start http servr use configuration
func (svr *HTTPServer) Start() {
	svr.RegisterRouter()
	err := http.ListenAndServe(fmt.Sprintf("%s:%d", svr.config.HTTP.Address, svr.config.HTTP.Port), svr.ctx)
	if err != nil {
		fmt.Println("Http server start failed")
	} else {
		fmt.Println("Http server started")
	}
}

// Stop stop http server
func (svr *HTTPServer) Stop() error {
	if svr.mysql != nil {
		err := svr.mysql.Close()
		if err != nil {
			log.Fatal("failed to close mysql db connection")
		}
	}

	return nil
}
