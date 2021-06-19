// pages/qianYue/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProDataf: [
      {
        name: '请选择签约主体'
      },
      {
        name: '公司'
      },
      {
        name: '个人'
      },
    ],
    countryIndex:0,
    pickerProDataf1: [
      {
        name: '请选择结算模式'
      },
      {
        name: '低价'
      },
      {
        name: '佣金'
      },
    ],
    countryIndex1:0,
    pickerProDataf2: [
      {
        name: '请选择商家类别'
      },
      {
        name: '中间商'
      },
      {
        name: '服务商'
      },
      {
        name: '中间商及服务商'
      },
    ],
    pickerProDataf3: [
      {
        name: '请选择产品类别'
      },
      {
        name: '景点'
      },
      {
        name: '玩乐'
      },
      {
        name: '一日游/小团游'
      },
      {
        name: '向导/包车游'
      },
      {
        name: '旅拍'
      },
    ],
    countryIndex3:0,
    imgbox: [],//选择图片
    imgbox1: [],//选择图片

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  pickerProChangef2: function (e) {
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
  },
  pickerProChangef3: function (e) {
    this.setData({ countryIndex3: e.detail.value });
    console.log(this.data.countryIndex3)
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
 
    var data = []
    for(var index in this.data.imgbox){
      data.push(this.data.imgbox[index].url1)
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
   // 删除照片 &&
   imgDelete1: function (e) {
    console.log('11')
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    for(var indexw in that.data.imgbox){
      if(index==indexw){
        that.data.imgbox.splice(indexw, 1)
      }
    }
    that.setData({
      imgbox: that.data.imgbox,
    });
    console.log(that.data.imgbox)
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 1;
    if (1 > imgbox.length > 0) {
      n = 1 - imgbox.length;
    } else if (imgbox.length == 1) {
      n = 1;
    }
    wx.chooseImage({
      count: 1, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          console.log(123)
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }

        } else if (  imgbox.length>0) {
          console.log(456)

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }
        }
        for (let index in imgbox) {
          console.log(tempFilePaths[index])
          console.log(index)
          if(!imgbox[index].url2){
            wx.uploadFile({
              url: app.globalData.url + '/api/common/upload',      //此处换上你的接口地址
              filePath: imgbox[index].url1,
              name: 'file',
              formData: {
                'user': 'test'  //其他额外的formdata，可不写
              },
              success: function (res) {
                wx.showLoading({
                  title: '上传中.',
                })
                if (res.statusCode == 200) {
                  wx.hideLoading()
                  var datas = JSON.parse(res.data);
                  console.log(datas)
                 imgbox[index].url2 = datas.data
                 console.log(  imgbox[index].url2 )
                that.setData({
                  imgbox: imgbox
                })
                }
              },
              
              fail: function (res) {
                console.log('fail');
                wx.hideLoading({
                  success: (res) => { },
                })
              },
            })
          }
   
        }
        
        // api / common / upload
      }
    })
    console.log(imgbox)
    console.log(this.data.imgbox)
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
  topic_preview1: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
 
    var data = []
    for(var index in this.data.imgbox1){
      data.push(this.data.imgbox1[index].url1)
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
   // 删除照片 &&
   imgDelete11: function (e) {
    console.log('11')
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    for(var indexw in that.data.imgbox1){
      if(index==indexw){
        that.data.imgbox1.splice(indexw, 1)
      }
    }
    that.setData({
      imgbox1: that.data.imgbox1,
    });
    console.log(that.data.imgbox1)
  },
  // 选择图片 &&&
  addPic11: function (e) {
    var imgbox1 = this.data.imgbox1;
    console.log(imgbox1)
    var that = this;
    var n = 1;
    if (1 > imgbox1.length > 0) {
      n = 1 - imgbox1.length;
    } else if (imgbox1.length == 1) {
      n = 1;
    }
    wx.chooseImage({
      count: 1, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (imgbox1.length == 0) {
          console.log(123)
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox1.push(youurl)
          }

        } else if (  imgbox1.length>0) {
          console.log(456)

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox1.push(youurl)
          }
        }
        for (let index in imgbox1) {
          console.log(tempFilePaths[index])
          console.log(index)
          if(!imgbox1[index].url2){
            wx.uploadFile({
              url: app.globalData.url + '/api/common/upload',      //此处换上你的接口地址
              filePath: imgbox1[index].url1,
              name: 'file',
              formData: {
                'user': 'test'  //其他额外的formdata，可不写
              },
              success: function (res) {
                wx.showLoading({
                  title: '上传中.',
                })
                if (res.statusCode == 200) {
                  wx.hideLoading()
                  var datas = JSON.parse(res.data);
                  console.log(datas)
                 imgbox1[index].url2 = datas.data
                 console.log(  imgbox1[index].url2 )
                that.setData({
                  imgbox1: imgbox1
                })
                }
              },
              
              fail: function (res) {
                console.log('fail');
                wx.hideLoading({
                  success: (res) => { },
                })
              },
            })
          }
   
        }
        
        // api / common / upload
      }
    })
    console.log(imgbox1)
    console.log(this.data.imgbox1)
  },

  //图片
  imgbox1: function (e) {
    this.setData({
      imgbox1: e.detail.value
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