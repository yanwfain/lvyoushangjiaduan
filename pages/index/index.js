// index.js
// 获取应用实例
var app = getApp()
var httpUtils = require('../../js/httpUtils.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    isSiuser: false,
    isloadview: true,
    canIUse: wx.canIUse('button.open-type.getUserProfile'),
    canIUseGetUserProfile: false,
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  orderList:function(e){
    wx.navigateTo({
      url: '/pages/orderlist/index',
    })
  },
  qianYue:function(e){
    wx.navigateTo({
      url: '/pages/qianYue/index',
    })
  },
  listChuang:function(e){
    wx.navigateTo({
      url: '/pages/indexChuang/index',
    })
  },
  getUserProfile(e) {
    console.log("ok")
    var that = this;
    wx.getUserProfile({
      desc: '展示用户信息',
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        getOpenid(that)
      },
      fail: function () { },
    })
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        if (e.detail.errMsg == 'getPhoneNsumber:fail user deny') {
          wx.showToast({
            title: '用户拒接授权',
            icon: 'none'
          })
        } else { //同意授权
          let url = app.globalData.url + '/api/User/getphone';
          console.log(url)
          let data = {
            encry: ency,
            iv: iv,
            sessionKey: app.globalData.session_key,
            openid: app.globalData.openId
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '获取成功',
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              var url = app.globalData.url + '/api/User/editUser';
              var data = {
                user_id: app.globalData.user_id,
                mobile: that.data.mobile
              }
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                wx.hideLoading()
                if (res.code == 1) {
                  that.setData({
                    isSiuser:false
                  })
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                }
              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            } else {
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        wx.showToast({
          title: 'session_key 已经失效，需要重新执行登录流程',
          icon: 'none'
        })
      }
    });
  },
})
function getOpenid(that) {
  var url = app.globalData.url + '/api/index/getOpenid';
  var url1 = app.globalData.url + '/api/user/getUserInfo';
  var url2 = app.globalData.url + '/api/user/addUser';
  // var url = 
  console.log(that)
  var params = {};
  params.appId = 'wxaba163f987c22a42';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      app.globalData.openId = res.data.openid
      app.globalData.session_key = res.data.session_key
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {
          if(res.data.mobile){
            that.setData({
              isSiuser:false
            })
          }else{
            that.setData({
              isSiuser:true
            })
          }
          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price,
            user_id: res.data.id
          })
        }
        if (res.code == '0') {
          that.setData({
            hasUserInfo:false
          }) 
          console.log(app.globalData.userInfo)
          if( that.data.nickName){
            app.globalData.head_img = app.globalData.userInfo.avatarUrl
            params.openid = app.globalData.openId;
            params.headimg = that.data.headimg;
            params.user_name = that.data.nickName;
            params.sex = that.data.gender;
          }
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              if(res.code ==0){
                that.setData({
                  hasUserInfo:false
                })
              }else{
                that.setData({
                  hasUserInfo:true
                })
                if(res.data.mobile){
                  that.setData({
                    isSiuser:false
                  })
                }else{
                  that.setData({
                    isSiuser:true
                  })
                }
                app.globalData.user_id = res.data.id
                app.globalData.user_name = res.data.name
                app.globalData.head_img = res.data.head_img
              }
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}