var app = getApp();
Page({
  data: {
    orderId: 0,
    goodsList: [],
    yunPrice: "0.00",
    picUrl:app.globalData.hostUrl
  },
  onLoad: function (e) {
    var orderId = e.id;
    this.data.orderId = orderId;
    this.setData({
      orderId: orderId
    });
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/order/detail',
      data: {
        order: that.data.orderId,
        user: app.globalData.openId,
        shop: app.globalData.shopId
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code != 200) {
          wx.showModal({
            title: '错误',
            content: res.data.error,
            showCancel: false
          })
          return;
        }
        that.setData({
          orderDetail: res.data.data
        });
      }
    })
    var yunPrice = parseFloat(this.data.yunPrice);
    var allprice = 0;
    var goodsList = this.data.goodsList;
    for (var i = 0; i < goodsList.length; i++) {
      allprice += parseFloat(goodsList[0].price) * goodsList[0].number;
    }
    this.setData({
      allGoodsPrice: allprice,
      yunPrice: yunPrice
    });
  },
  wuliuDetailsTap: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/wuliu/index?id=" + orderId
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
})