package v1

import (
	"io"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"github.com/jinzhu/gorm"
	"ly-wemall/lymall.com/models"
	"ly-wemall/lymall.com/toolkits"
	"ly-wemall/lymall.com/toolkits/httpctx"
)

// ImageController 图片控制器
type ImageController struct {
}

func (c *ImageController) Upload(ctx *httpctx.HTTPCtx, db *gorm.DB) {
	file, header, err := ctx.GetFile("file")
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	defer file.Close()
	day := time.Now().Format("2006-01-02")
	dirPath := "upload/" + day

	err = toolkits.CreateOrGetPath("public/" + dirPath)
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ext := path.Ext(header.Filename)
	savePath := dirPath + "/" + strconv.FormatInt(time.Now().Unix(), 10) + ext
	f, err := os.Create("public/" + savePath)
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}
	defer f.Close()

	if _, err := io.Copy(f, file); err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	img := &models.ProductImageModel{
		Id:   0,
		Url:  savePath,
		Mime: "",
	}

	err = db.Create(img).Error
	if err != nil {
		ctx.Error(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Success(http.StatusOK, img)
}
