// personalCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthenticationPic: 1, //是否认证（1否）
    isAuthentication: '', //我的认证
    personInfo: {},
    showBtn: false, //权限
    userInfo: {},
    jumpData: [
      { id: 0, url: '../preview/index', img: '../../static/images/preview.svg', text: '工作一览' },
      { id: 1, url: '../repairInfo/repairInfo', img: '../../static/personalCenter/person01.png', text: '我的信息' },
      { id: 2, url: '../myappointment/myappointment', img: '../../static/personalCenter/person02.png', text: '我的预约' },
      { id: 3, url: '../myactive/myactive', img: '../../static/personalCenter/person03.png', text: '我的活动' },
      { id: 4, url: '../mystudy/mystudy', img: '../../static/personalCenter/person04.png', text: '我的学习' },
      { id: 5, url: '../mypoints/mypoints', img: '../../static/personalCenter/person05.png', text: '我的积分' },
      { id: 6, url: '../partyGroupService/partyGroupService', img: '../../static/tabbar_icon/bottom_icon04.png', text: '党群服务' },
      { id: 7, url: '../rubbish/index', img: '../../static/images/rubbish.svg', text: '垃圾分类' },
      { id: 8, url: '../onlineElection/index', img: '../../static/personalCenter/person08.png', text: '在线选举' },
    ]
  },

  /**
   * method
   */
  statusOn() {
    console.log('点击了状态图标:::::::', this);
  },
  jump(e) {
    app.globalData.checkRegister(app.globalData.personInfo.if_register)
   
    //未检测到用户
    if (app.globalData.personInfo.if_register == 2) {
      return;
    }
    let index = e.currentTarget.id;
    wx.navigateTo({
      url: this.data.jumpData[index].url,
    })
  },
  // 获取用户信息-from 接口
  getPersonInfo() {
    let _this = this;
    wx.request({
      // url: app.globalData.url + `user/${app.globalData.personInfo.id}`,
      url: app.globalData.url + `user/info?id=${app.globalData.personInfo.id}`,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          app.globalData.personInfo = res.data.data
          // _this.checkAuth();
        }
      }
    });
  },
  // 获取用户信息-from appjs配置
  getPersonInfoByAppJs() {
    app.getPersonInfo();
  },
  // 扫码
  scan() {
    wx.scanCode({
      // onlyFromCamera: onlyCamera, // true为只可使用相机扫码
      success: (res) => { },
      complete: res => {
        if (res.result) {
          wx.navigateTo({
            url: res.result
            // url: '../../pages/myactive/sign?id=' + this.data.detail.id + '&uid=' + app.globalData.personInfo.id
          })
        } else {
          console.log('扫码失败:::', res);
        }
      }
    });
    return false;
  },
  statusOn() {
    console.log('点击了状态图标:::::::', this);
  },
  // checkAuth() {
  //   let me = this;
  //   me.setData({
  //     personInfo: app.globalData.personInfo,
  //   })
  //   // 如果是未注册或为登录用户
  //   if (!me.data.personInfo.authentication) {
  //     me.setData({
  //       //未验证
  //       isAuthentication: '../register/register',
  //       isAuthenticationPic: 1
  //     })
  //     /** 检测是否登录或认证了 **/
  //     // app.globalData.checkIsLogin(app.globalData.personInfo.id);
  //   } else {
  //     if (me.data.personInfo.authentication == 2) {
  //       me.setData({
  //         //已验证
  //         isAuthentication: '../repairInfo/repairInfo',
  //         isAuthenticationPic: 2
  //       })
  //     } else if (me.data.personInfo.authentication == 1) {
  //       me.setData({
  //         //未验证
  //         isAuthentication: '../identity/identity',
  //         isAuthenticationPic: 1
  //       })
  //     }
  //     // 显示管理员的一些功能
  //     if (!app.globalData.personInfo.authority || Number(app.globalData.personInfo.authority) < 2) {
  //       me.setData({
  //         showBtn: false
  //       });
  //     } else {
  //       me.setData({
  //         showBtn: true
  //       });
  //     }
  //   }
  // },
  // /* 登录微信 */
  // reLogin() {
  //   let _this = this;
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       //调用request请求api转换登录凭证  
  //       wx.request({
  //         url: app.globalData.url + 'getWxUserInfo',
  //         method: 'GET',
  //         data: {
  //           code: res.code
  //         },
  //         success: function (res) {
  //           if (res.data.data.id && res.statusCode == 200) {
  //             app.globalData.personInfo = res.data.data;
  //             _this.setData({
  //               uid: res.data.data.id
  //             });
  //             // wx.showToast({
  //             //   title: String(res.data.data.id),
  //             //   icon: 'none',
  //             //   duration: 3000
  //             // });
  //           } else if (res.data.data.if_register == 2) {
  //             wx.showModal({
  //               title: '温馨提示',
  //               content: '您尚未注册，是否立刻注册 ？',
  //               success: function (e) { // 点击确定或取消按钮的回调事件  confirm-确定 cancel-取消
  //                 if (e.confirm == true) {
  //                   wx.navigateTo({
  //                     url: '../../pages/register/register'
  //                   })
  //                 }
  //               }
  //             });
  //           } else {
  //             wx.showToast({
  //               title: '登录失败，请关闭微信，重新打开小程序；若依然登录失败，请联系管理员 ！！！',
  //               icon: 'none',
  //               duration: 3000
  //             });
  //           }
  //         },
  //         fail: (res) => {
  //           wx.showToast({
  //             title: '登录失败，请关闭微信，重新打开小程序；若依然登录失败，请联系管理员 ！！！',
  //             icon: 'none',
  //             duration: 3000
  //           });
  //           console.log('登录失败:', res);
  //         }
  //       })
  //     }
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // this.reLogin();
     let _this = this;
      setTimeout(function(){
        console.log(app.globalData.userInfo)
        if (app.globalData.userInfo){
           app.globalData.checkRegister(app.globalData.personInfo.if_register)
        }
        //未检测到用户
        if (app.globalData.personInfo.if_register == 2) {
          return;
        }
        setTimeout(function () {
          if (!app.globalData.personInfo) {
            _this.getPersonInfoByAppJs();
            setTimeout(function () {
              _this.getPersonInfo();
            }, 500);
          } else {
            _this.getPersonInfo();
          }
        }, 500);
      },1000)
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
    wx.stopPullDownRefresh()
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