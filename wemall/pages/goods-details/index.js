// pages/goods-details/index.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    goodsDetail: {},

    hasMoreSelect: false,
    selectSize: "",
    selected: [],

    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 5,

    hideShopPopup: true,
    stockId: 0,
    canSubmit: false,
    picUrl: '',
    shopCartInfo: {},
    shopNum: 0,
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 前往购物车
   */
  goShopCart: function () {
    wx.reLaunch({
      url: '/pages/cart/index',
    })
  },

  /**
   * 显示选择规格
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },

  /**
   * 打开商品添加到购物车弹出框
   */
  toAddShopCart: function () {
    this.setData({
      hideShopPopup: false
    })
  },

  /**
  * 规格选择弹出框隐藏
  */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },

  /**
   * 添加购物车时数量管理：加
   */
  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },

  /**
   * 添加购物车时数量管理：减
   */
  numJiaTap: function () {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },

  /**
   * 选择商品规格
   */
  labelItemTap: function (e) {
    var that = this;

    //所有取消选中
    var ppIndex = e.currentTarget.dataset.ppindex;
    for (var i = 0; i < that.data.goodsDetail.Properties[ppIndex].SubProperties.length; i++) {
      that.data.goodsDetail.Properties[ppIndex].SubProperties[i].active = false;
    }

    //获取当前选中
    var ppId = e.currentTarget.dataset.ppid;
    var ppName = e.currentTarget.dataset.ppname;
    var subId = e.currentTarget.dataset.subid;
    var subName = e.currentTarget.dataset.subname;
    var subIndex = e.currentTarget.dataset.subindex;

    var selInfo = {};
    selInfo.ppvId = subId;
    selInfo.ppvDesc = ppName + ":" + subName;

    //设置当前选中
    that.data.goodsDetail.Properties[ppIndex].SubProperties[subIndex].active = true;
    that.data.selected[ppId] = selInfo;

    var selectedCount = Object.keys(that.data.selected).length;
    var ppCount = that.data.goodsDetail.Properties.length;

    if (selectedCount == ppCount) {
      that.data.canSubmit = true;
    }

    //设置结果
    this.setData({
      goodsDetail: that.data.goodsDetail,
      //stockId: 1,
      canSubmit: that.data.canSubmit,
      selected: that.data.selected
    })
  },

  /**
   * 确认添加到购物车
   */
  addShopCart: function () {
    //若商品有多个属性
    if (this.data.goodsDetail.HasProperty && !this.data.canSubmit) {
      wx.showModal({
        title: '提示',
        content: '请选择商品规格！',
        showCancel: false,
      })
      this.bindGuiGeTap();
      return;
    }

    var brief = "";
    var ppvIds = "";
    for (var key in this.data.selected) {
      brief = brief + this.data.selected[key].ppvDesc + " ";
      ppvIds = ppvIds + this.data.selected[key].ppvId + ",";
    }

    var oneCart = {};
    oneCart.ProductId = this.data.goodsDetail.Id;
    oneCart.ProductName = this.data.goodsDetail.Name;
    oneCart.Count = this.data.buyNumber;
    oneCart.Image = this.data.goodsDetail.CoverUrl;
    oneCart.Price = this.data.goodsDetail.Price;
    oneCart.PpvBrief = brief;
    oneCart.PpvIds = ppvIds;
    oneCart.OpenId = app.globalData.openId;
    oneCart.ShopId = app.globalData.shopId;

    var that = this;
    // wx.request({
    //   url: app.globalData.hostUrl + 'v1/shop/cart',
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data: JSON.stringify(oneCart),
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.code != 200) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '加入心愿单请求服务接口异常',
    //       })
    //       console.log(res.data.error)
    //     } else {
    //       var newNum = that.data.shopNum + that.data.buyNumber;
    //       that.setData({
    //         shopNum: newNum
    //       })
    //     }
    //   }
    // })

    var tempCart = this.data.shopCartInfo;
    if (!tempCart.shopNum) {
      tempCart.shopNum = 0;
    }

    if (!tempCart.goodsList) {
      tempCart.goodsList = [];
    }

    var existIndex = -1;
    for (var i = 0; i < tempCart.goodsList.length; i++) {
      var item = tempCart.goodsList[i];
      if (item.ProductId == oneCart.ProductId && item.PpvIds == oneCart.PpvIds) {
        existIndex = i;
        oneCart.Count = oneCart.Count + item.Count;
        break;
      }
    }
    tempCart.shopNum = tempCart.shopNum + this.data.buyNumber;
    if (existIndex > -1) {
      tempCart.goodsList.splice(existIndex, 1, oneCart);
    } else {
      tempCart.goodsList.push(oneCart);
    }

    wx.setStorageSync("shopCartInfo", tempCart);
    this.setData({
      shopCartInfo: tempCart,
      shopNum: tempCart.shopNum
    });

    this.closePopupTap();

    //添加到收藏夹
    wx.showToast({
      icon: 'success',
      title: '加入收藏夹成功！',
      duration: 2000,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      picUrl: app.globalData.hostUrl
    })
    console.log(options)
    var id = options.id
    var that = this;

    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/goods/' + id,
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '提示',
            content: '请求服务接口异常',
          })
          console.log(res.data.error)
        } else {
          console.log(res.data.data)
          if (res.data.data.HasProperty) {
            var tempStr = "选择："
            for (var i = 0; i < res.data.data.Properties.length; i++) {
              tempStr += res.data.data.Properties[i].Name + " "
            }
          }
          that.setData({
            goodsDetail: res.data.data,
            hasMoreSelect: res.data.data.HasProperty,
            selectSize: tempStr,
          })
          WxParse.wxParse('article', 'html', res.data.data.Content, that, 5);
        }
      }
    })

    wx.getStorage({
      key: "shopCartInfo",
      success: function (res) {
        that.setData({
          shopCartInfo: res.data,
          shopNum: res.data.shopNum
        })
      }
    });


    // //查询购物车商品数量
    // wx.request({
    //   url: app.globalData.hostUrl + 'v1/shop/cart/count',
    //   data: {
    //     shop: app.globalData.shopId,
    //     user: app.globalData.openId
    //   },
    //   success: function (res) {
    //     if (res.data.code != 200) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '请求服务接口异常',
    //       })
    //       console.log(res.data.error)
    //     } else {
    //       that.setData({
    //         shopNum: res.data.data.Total
    //       })
    //     }
    //   }
    // })
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
})