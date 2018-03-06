// pages/goods-details/index.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    goodsDetail: {},

    hasMoreSelect: false,
    selectSize: "",

    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 5,

    hideShopPopup: true,
    stockId: 0,
    canSubmit: false,
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
    for (var i = 0; i < that.data.goodsDetail.property.values.length; i++) {
      that.data.goodsDetail.property.values[i].active = false;
    }

    //获取当前选中
    var itemId = e.currentTarget.dataset.itemid;
    var itemName = e.currentTarget.dataset.itemname;

    //设置当前选中
    for (var i = 0; i < that.data.goodsDetail.property.values.length; i++) {
      var item = that.data.goodsDetail.property.values[i];
      if (item.id == itemId) {
        that.data.goodsDetail.property.values[i].active = true;
      }
    }

    //设置结果
    this.setData({
      goodsDetail: that.data.goodsDetail,
      stockId: 1,
      canSubmit: true,
    })
  },

  /**
   * 确认添加到购物车
   */
  addShopCart: function () {
    //若商品有多个属性
    if (this.data.goodsDetail.property && !this.data.canSubmit) {
      wx.showModal({
        title: '提示',
        content: '请选择商品规格！',
        showCancel: false,
      })
      this.bindGuiGeTap();
      return;
    }

    this.closePopupTap();

    //添加到购物车（请求服务方法）
    wx.showToast({
      icon: 'success',
      title: '加入购物车成功！',
      duration: 2000,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var test = {
      basicInfo: {
        id: 1,
        name: "Dior MAC Test商品名称",
        price: 199,
        pic: "../../images/products/7.jpg"
      },
      pics: [
        {
          pic: "../../images/products/7.jpg"
        },
        {
          pic: "../../images/products/7.jpg"
        },
      ],
      property: {
        id: 11,
        name: "颜色",
        values: [
          {
            id: 1,
            parentId: 1,
            name: "樱桃红"
          },
          {
            id: 2,
            parentId: 1,
            name: "樱花粉"
          },
          {
            id: 3,
            parentId: 1,
            name: "玫瑰红"
          }
        ]
      },
      content: "<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>"
    }
    this.setData({
      goodsDetail: test,
      hasMoreSelect: true,
      selectSize: "选择：颜色"
    });
    WxParse.wxParse('article', 'html', test.content, that, 5);
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