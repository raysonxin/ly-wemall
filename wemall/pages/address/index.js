//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList: []
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.hostUrl+'v1/shop/my/addr/setdefault',
      data: {
        user: app.globalData.openId,
        id: id
      },
      success: (res) => {
        wx.navigateBack({})
      }
    })
  },

  addAddess: function () {
    wx.navigateTo({
      url: "/pages/address/add"
    })
  },

  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/address/add?id=" + e.currentTarget.dataset.id
    })
  },

  onLoad: function () {
   // console.log('onLoad')
  },

  onShow: function () {
    this.initShippingAddress();
  },

  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "v1/shop/my/addr",
      data: {
        user: app.globalData.openId
      },
      success: (res) => {
        if (res.data.code == 200) {
          that.setData({
            addressList: res.data.data
          });
        } else {
          that.setData({
            addressList: null
          });
        }
      }
    })
  }

})
