// pages/admin/goods/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    selectCat: 0,
    picUrl: app.globalData.hostUrl,
    goods: [],
    pageInfo: {},
    index: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsCategory();
    this.getGoodsList(0);
  },
  tapAddGoods: function () {
    wx.navigateTo({
      url: '/pages/goods/add',
    })
  },
  tapEditGoods: function (e) {
    wx.navigateTo({
      url: '/pages/goods/add?id=' + e.currentTarget.dataset.id,
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var tempCat = e.detail.value;
    if (tempCat != this.data.selectCat) {
      this.setData({
        selectCat: e.detail.value,
        goods: [],
        index: 1
      })
      this.getGoodsList(tempCat);
    }
  },
  getGoodsCategory: function () {
    var that = this

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
          console.log(res.data.error)
        } else {
          var tempCats = res.data.data
          var allCat = {};
          allCat.Id = 0;
          allCat.Name = '全部';
          allCat.ShopId = ''
          tempCats.unshift(allCat);

          that.setData({
            categories: tempCats,
          })
        }
      }
    })

  },

  //查询商品列表
  getGoodsList: function (categoryId) {
    var that = this
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/goods/new',
      data: {
        shop: app.globalData.shopId,
        category: categoryId,
        index: that.data.index,
        // keywords: this.data.searchInput
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '提示',
            content: '请求服务接口异常',
          })
          console.log(res.data.error)
        } else {

          var tempGoods = that.data.goods;
          if (!tempGoods) {
            tempGoods = [];
          }
          tempGoods = tempGoods.concat(res.data.data);

          that.setData({
            goods: tempGoods,
            pageInfo: res.data.page
          })
        }
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
    this.setData({
      index: 1,
      goods: []
    })
    this.getGoodsCategory();
    this.getGoodsList(0);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.pageInfo.Index >= that.data.pageInfo.Total) {
      return;
    }
    var tempIndex = that.data.pageInfo.Index + 1;
    that.setData({
      index: tempIndex
    })
    this.getGoodsList(that.data.selectCat);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})