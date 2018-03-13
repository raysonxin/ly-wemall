//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // autoplay:true,
    // interval: 3000,
    // duration: 1000,
    // swiperCurrent:0,
    scrollTop: "0",
    loadingMoreHidden: true,
    categories: [],           //定义产品分类
    activeCategoryId: 0,      //当前选中的产品分类
    // banners:[],
    goods: [],                 //商品列表

    searchInput: '',
  },
  // swiperchange:function(e){
  //   this.setData({
  //     swiperCurrent: e.detail.current
  //   })
  // },
  // tapBanner: function (e) {
  //   if (e.currentTarget.dataset.id != 0) {
  //   //  wx.navigateTo({
  //    //   url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
  //    // })
  //   }
  // },
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
  
  //查询商品列表
  getGoodsList: function (categoryId) {

  },

  //点击商品跳转
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },

  // 搜索按钮事件
  toSearch: function () {
    //this.getGoodsList(this.data.activeCategoryId);
    var carts = [
      {
        id: 1,
        name: "【爱宝宝母婴微商城】防腹泻奶粉——赋儿嘉",
        pic: "../../images/products/3.jpg",
        price: 198,
        originalPrice: 250,
        count: 2
      },
      {
        id: 2,
        name: "【爱宝宝母婴微商城】防腹泻奶粉",
        pic: "../../images/products/4.jpg",
        price: 298,
        originalPrice: 350,
        count: 3
      }]

    this.setData({
      goods: carts,
    });

  },
  
  onLoad: function () {
    var that = this
    var carts = [
      {
        id: 1,
        name: "【爱宝宝母婴微商城】防腹泻奶粉——赋儿嘉",
        pic: "../../images/products/3.jpg",
        price: 198,
        originalPrice: 250,
        count: 2
      },
      {
        id: 2,
        name: "【爱宝宝母婴微商城】防腹泻奶粉",
        pic: "../../images/products/4.jpg",
        price: 298,
        originalPrice: 350,
        count: 3
      },
      {
        id: 3,
        name: "【爱宝宝母婴微商城】防腹泻奶粉——赋儿嘉",
        pic: "../../images/products/7.jpg",
        price: 198,
        originalPrice: 250,
        count: 2
      },
      {
        id: 4,
        name: "【爱宝宝母婴微商城】防腹泻奶粉",
        pic: "../../images/products/9.jpg",
        price: 298,
        originalPrice: 350,
        count: 3
      },
      {
        id: 5,
        name: "【爱宝宝母婴微商城】防腹泻奶粉——赋儿嘉",
        pic: "../../images/products/11.jpg",
        price: 198,
        originalPrice: 250,
        count: 2
      },
      {
        id: 6,
        name: "【爱宝宝母婴微商城】防腹泻奶粉",
        pic: "../../images/products/2.jpg",
        price: 298,
        originalPrice: 350,
        count: 3
      }
    ]

    // var cats = [
    //   {
    //     id: 0,
    //     name: "全部"
    //   },
    //   {
    //     id: 1,
    //     name: "化妆品"
    //   },
    //   {
    //     id: 2,
    //     name: "包包"
    //   },
    //   {
    //     id: 3,
    //     name: "日用百货"
    //   }
    // ]
    wx.request({
      url:app.globalData.hostUrl+'v1/category',
      data:{
        key:app.globalData.shopName
      },
      success:function(res){
        if(res.statusCode==400){
          wx.showModal({
            title: '提示',
            content: '服务请求失败',
          })
        }else{
          that.setData({
            categories:res.data.data
          })
        }
      }
    })

    this.setData({
      goods: carts,
      banners: carts,
    });
  }
})
