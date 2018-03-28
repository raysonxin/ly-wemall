//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    goodsList: [],
    allGoodsPrice: 0,
    yunPrice: 0,
    goodsCount: 0,
    allGoodsAndYunPrice: 0,
    defaultAddress: null,
    picHost: app.globalData.hostUrl
  },
  onShow: function () {
    var that = this;
    var shopList = [];

    //购物车下单
    var shopCarInfoMem = wx.getStorageSync('shopCartInfo');
    if (shopCarInfoMem && shopCarInfoMem.goodsList) {
      shopList = shopCarInfoMem.goodsList.filter(entity => {
        return entity.active;
      });
    }

    that.setData({
      goodsList: shopList,
    });
    that.initShippingAddress();
    that.processYunfei();
  },

  onLoad: function (e) {
    this.onShow();
  },

  getDistrictId: function (obj, aaa) {
    if (!obj) {
      return "";
    }
    if (!aaa) {
      return "";
    }
    return aaa;
  },

  createOrder: function (e) {
    wx.showLoading();
    var that = this;
    var loginToken = app.globalData.token // 用户登录 token
    var remark = ""; // 备注信息
    if (e) {
      remark = e.detail.value.remark; // 备注信息
    }

    if (!that.data.defaultAddress) {
      wx.hideLoading();
      wx.showModal({
        title: '错误',
        content: '请先设置您的收货地址！',
        showCancel: false
      })
      return;
    }

    var addr = that.data.defaultAddress;

    var postData = {
      ShopId: app.globalData.shopId,
      OpenId: app.globalData.openId,
      GoodsCount: that.data.goodsCount,
      GoodsPrice: that.data.allGoodsPrice,
      YunPrice: that.data.yunPrice,
      Payment: that.data.allGoodsAndYunPrice,
      Address: addr.Province + addr.City + addr.District + addr.DetailAddress,
      Contact: that.data.defaultAddress.Contact,
      Mobile: that.data.defaultAddress.Mobile,
      Status: 1,
      // CreateTime: Date(),
      Remark: remark,
      OrderGoods: that.data.goodsList
    };

    wx.request({
      url: app.globalData.hostUrl + "v1/shop/order",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: JSON.stringify(postData),
      success: function (res) {
        wx.hideLoading();
        if (res.data.code != 200) {
          wx.showModal({
            title: '错误',
            content: "创建心愿单失败",
            showCancel: false
          })
          return;
        } else {

          var shopList = [];
          var count = 0;
          var shopCarInfoMem = wx.getStorageSync('shopCartInfo');
          if (shopCarInfoMem && shopCarInfoMem.goodsList) {
            shopList = shopCarInfoMem.goodsList.filter(entity => {
              return !entity.active;
            });
          }

          if (shopList && shopList.length > 0) {
            for (var i = 0; i < shopList.length; i++) {
              count += shopList[i].Count;
            }
          }

          var shopCartInfo = {};
          shopCartInfo.goodsList = shopList;
          shopCartInfo.shopNum = count;
          wx.setStorageSync("shopCartInfo", shopCartInfo);

          wx.showModal({
            title: '提示',
            content: "已生成心愿单",
            showCancel: false
          });

          wx.redirectTo({
            url: '/pages/order/index',
          })
        }
      }
    })
  },

  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/my/addr/default',
      data: {
        user: app.globalData.openId
      },
      success: (res) => {
        if (res.data.code != 200) {
          that.setData({
            defaultAddress: null
          });
        } else {
          that.setData({
            defaultAddress: res.data.data
          });
        }
      }
    })
  },

  processYunfei: function () {
    var that = this;
    var goodsList = this.data.goodsList;
    var allGoodsPrice = 0;
    var count = 0;

    for (let i = 0; i < goodsList.length; i++) {
      let item = goodsList[i];
      allGoodsPrice += item.Price * item.Count;
      count += item.Count;
    }

    that.setData({
      allGoodsPrice: allGoodsPrice,
      yunPrice: 0,
      goodsCount: count,
      allGoodsAndYunPrice: allGoodsPrice
    });
    // that.createOrder();
  },

  addAddress: function () {
    wx.navigateTo({
      url: "/pages/address-add/index"
    })
  },

  selectAddress: function () {
    wx.navigateTo({
      url: "/pages/address/index"
    })
  }
})
