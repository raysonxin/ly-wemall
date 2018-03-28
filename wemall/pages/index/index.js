//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    scrollTop: "0",
    loadingMoreHidden: true,
    categories: [],           //定义产品分类
    activeCategoryId: 0,      //当前选中的产品分类
    banners: [],
    goods: [],                 //商品列表

    searchInput: '',
    pageInfo: {},
    picHost: ''
  },
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  // 监听搜索框输入
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },

  //商品分类切换事件
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
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
  getRecommandList: function () {
    var that = this
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/goods/tj',
      data: {
        shop: app.globalData.shopId
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '提示',
            content: '请求服务接口异常',
          })
          console.log(res.data.error)
        } else {
          that.setData({
            banners: res.data.data
          })
        }
      }
    })
  },
  //查询商品列表
  getGoodsList: function (categoryId) {
    var that = this
    wx.request({
      url: app.globalData.hostUrl + 'v1/shop/goods',
      data: {
        shop: app.globalData.shopId,
        category: categoryId,
        keywords: this.data.searchInput
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '提示',
            content: '请求服务接口异常',
          })
          console.log(res.data.error)
        } else {
          that.setData({
            goods: res.data.data,
            pageInfo: res.data.page
          })
        }
      }
    })
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

  //点击商品跳转
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },

  // 搜索按钮事件
  toSearch: function () {
    this.getGoodsList(this.data.activeCategoryId);
  },

  onLoad: function () {
    this.setData({
      picHost: app.globalData.hostUrl
    })

    this.getRecommandList();
    this.getGoodsCategory();
    this.getGoodsList(0);
  }
})
