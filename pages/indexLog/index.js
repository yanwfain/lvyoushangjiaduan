// pages/indexLog/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  password:function(e){
    this.setData({
      password:e.detail.value
    })
  },  
  phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  passwordDele:function(e){
    this.setData({
      password:''
    })
  },
  submitLogn:function(e){
    // if(!this.data.phone){
    //   this.setData({
    //     isFalse:'手机号不正确'
    //   })
    //   return
    // }
    // if(!this.data.password){
    //   this.setData({
    //     isFalse:'请填写密码'
    //   })
    //   return
    // }
    wx.redirectTo({
      url: '/pages/index/index',
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