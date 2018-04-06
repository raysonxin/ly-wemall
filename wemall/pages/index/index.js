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
    index:1,
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
      activeCategoryId: e.currentTarget.id,
      index:1,
      goods:[]
    });
    this.getGoodsList(this.data.activeCategoryId);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      index: 1,
      goods: []
    })
    this.getRecommandList();
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
    this.getGoodsList(that.data.activeCategoryId);
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
      url: app.globalData.hostUrl + 'v1/shop/goods/new',
      data: {
        shop: app.globalData.shopId,
        category: categoryId,
        keywords: this.data.searchInput,
        index:that.data.index
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
    this.setData({
      index: 1,
      goods: []
    })
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
