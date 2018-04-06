var util= require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    statusType: ["","待付款", "待发货", "待收货",  "已完成"],
    currentType:0,
    tabClass: ["", "", "", "", ""],
    orderList:[],
    picUrl:app.globalData.hostUrl
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order/detail?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/close',
            data: {
              token: app.globalData.token,
              orderId: orderId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    wx.request({
      url: app.globalData.hostUrl+'v1/shop/order',
      data: {
        user: app.globalData.openId,
        shop: app.globalData.shopId
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 200) {
          var temp=res.data.data;
          
          that.setData({
            orderList: temp
          });
        } else {
          this.setData({
            orderList: null
          });
        }
      }
    })
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})