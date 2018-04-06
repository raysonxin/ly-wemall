// pages/admin/goods/add.js
const app = getApp();
const Zan = require("../../dist/index.js")
const Promise=require("../../utils/promise.js")
Page(Object.assign({}, Zan.Field, {

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    picUrl: app.globalData.hostUrl,
    goodsInfo: {},
    categories: [],
    // coverUrl: {},
    galleryCount: 3,
    galleryUrls: [],
    detailsCount: 10,
    detailsUrls: [],
    selCatId: 0,
    selCategory: "请选择",
    code: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在请求数据',
    });

    // this.getGoodsCategory();
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/category',
      data: {
        shop: app.globalData.shopId
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '请求服务接口异常',
          })
          // console.log(res.data.error)
        } else {
          var tempCats = res.data.data
          var allCat = {Id:0,Name:"请选择",ShopId:''};
          tempCats.unshift(allCat);

          that.setData({
            categories: tempCats,
          })

          var id = options.id;
          if (id) {
            wx.request({
              url: app.globalData.hostUrl + 'v1/shop/goods/' + id,
              data: {},
              success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                  var info = res.data.data;
                  var temp = { Id: info.Cover, Url: info.CoverUrl };

                  var catName = "";
                  for (var i = 0; i < that.data.categories.length; i++) {
                    if (that.data.categories[i].Id == info.CategoryId) {
                      catName = that.data.categories[i].Name;
                      break;
                    }
                  }

                  that.setData({
                    id: id,
                    goodsInfo: info,
                    galleryUrls: info.Gallery,
                    detailsUrls: info.Details,
                    coverUrl: temp,
                    selCatId: info.CategoryId,
                    selCategory: catName,
                    code: info.Code,
                  })
                }
              }
            })
          }
        }
      },
      complete:function(res){
        wx.hideLoading();
      }
    })    
  },

  tapScanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.setData({
          code: res.result,
        })
      }
    })
  },

  bindPickerChange: function (e) {
    var index = e.detail.value;
    this.setData({
      selCategory: this.data.categories[index].Name,
      selCatId: this.data.categories[index].Id
    })
  },
  chooseConverImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '正在上传图片...',
        })
        wx.uploadFile({
          url: app.globalData.hostUrl + 'v1/admin/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            wx.hideLoading();
            var result = JSON.parse(res.data)
            if (result.code != 200) {
              wx.showModal({
                title: '提示',
                content: '图片上传失败！',
              })
            } else {
              that.setData({
                coverUrl: result.data
              })
            }
          },
          fail: function (res) {
            wx.hideLoading();
          }
        })
      },
    })
  },
  chooseGalleryImage: function () {
    var that = this;
    if (that.data.galleryUrls.length >= that.data.galleryCount) {
      wx.showModal({
        title: '提示',
        content: '最多允许上传' + that.data.galleryCount + "张图片！",
      });
      return;
    }

    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '正在上传图片...',
        })
        var current = res.tempFilePaths[0];
        wx.uploadFile({
          url: app.globalData.hostUrl + 'v1/admin/upload',
          filePath: current,
          name: 'file',
          success: function (res) {
            var result = JSON.parse(res.data)
            if (result.code != 200) {
              wx.showModal({
                title: '提示',
                content: '图片上传失败！',
              })
            } else {

              var gallery = that.data.galleryUrls;
              if (!gallery) {
                gallery = []
              }
              gallery.push(result.data)
              that.setData({
                galleryUrls: gallery
              })
            }
          },
          fail: function (res) {
            wx.hideLoading();
          },
          complete: function (res) {
            wx.hideLoading();
          }
        })

      },
    })
  },
  toDelGalleryImage: function (e) {
    console.log(e);
  },
  chooseDetailsImage: function () {
    var that = this;
    var tempUrls = that.data.detailsUrls;
    if (!tempUrls) {
      tempUrls = [];
    }
    if (tempUrls.length >= that.data.detailsCount) {
      wx.showModal({
        title: '提示',
        content: '最多允许上传' + that.data.detailsCount + "张图片！",
      });
      return;
    }

    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '正在上传图片...',
        });

        var current = res.tempFilePaths[0];
        wx.uploadFile({
          url: app.globalData.hostUrl + 'v1/admin/upload',
          filePath: current,
          name: 'file',
          success: function (res) {
            let result = JSON.parse(res.data)
            if (result.code != 200) {
              wx.showModal({
                title: '提示',
                content: '图片上传失败！',
              })
            } else {
              let gallery = that.data.detailsUrls;
              if (!gallery) {
                gallery = []
              }
              gallery.push(result.data)
              that.setData({
                detailsUrls: gallery
              })
            }
          },
          fail: function (res) {
          },
          complete: function (res) {
            wx.hideLoading();
          }
        })
      }
    })
  },

  toDelDetailImage: function (e) {
    console.log(e);
  },

  bindSave: function (e) {
    var that = this;
    var name = e.detail.value.gname;

    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '商品名称不能为空！',
      });
      return;
    }
    var price = parseInt(e.detail.value.price);
    if (price == 0) {
      wx.showModal({
        title: '提示',
        content: '商品价格必须大于0！',
      });
      return;
    }

    if (that.data.selCatId == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择商品分类！',
      });
      return;
    }

    if (!that.data.coverUrl) {
      wx.showModal({
        title: '提示',
        content: '请上传商品封面图片！',
      });
      return;
    }

    var ercode = e.detail.value.code;

    var cover = that.data.coverUrl.Id;

    if (!that.data.galleryUrls || that.data.galleryUrls.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请上传商品相册图片！',
      });
      return;
    }
    var gIds = [];
    for (var i = 0; i < that.data.galleryUrls.length; i++) {
      gIds.push(that.data.galleryUrls[i].Id);
    }
    var galleryIds = "[" + gIds.join(",") + "]";

    //处理详情
    if (!that.data.detailsUrls || that.data.detailsUrls.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请上传商品详情图片！',
      });
      return;
    }
    var dIds = [];
    for (var i = 0; i < that.data.detailsUrls.length; i++) {
      dIds.push(that.data.detailsUrls[i].Id);
    }
    var detailIds = "[" + dIds.join(",") + "]";

    var goods = {
      Id: parseInt(that.data.id),
      Name: name,
      Price: price,
      Cover: cover,
      Images: galleryIds,
      Status: 1,
      Content: detailIds,
      Code: ercode,
      CategoryId: that.data.selCatId,
      ShopId: app.globalData.shopId,
    };

    var method = that.data.id == 0 ? "POST" : "PUT";
    var fix = that.data.id == 0 ? "" : "/" + that.data.id;

    wx.request({
      url: app.globalData.hostUrl + 'v1/admin/goods' + fix,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: JSON.stringify(goods),
      success: function (res) {
        if (res.data.code != 200) {
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.error,
            showCancel: false
          })
          return;
        }
        // 
        wx.navigateBack({})
        // wx.navigateTo({
        //   url: '/pages/goods/index',
        // })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))