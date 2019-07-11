// personalCenter.js
const app = getApp();
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
      // { id: 0, url: '../preview/index', img: '../../static/images/preview.svg', text: '工作一览',isShow:true },
      { id: 0, url: '../repairInfo/repairInfo', img: '../../static/personalCenter/person01.png', text: '我的信息', isShow:true},
      // { id: 2, url: '../myappointment/myappointment', img: '../../static/personalCenter/person02.png', text: '我的预约', isShow: true},
      // { id: 3, url: '../myactive/myactive', img: '../../static/personalCenter/person03.png', text: '我的活动', isShow: true},
      { id: 1, url: '../mystudy/mystudy', img: '../../static/personalCenter/person04.png', text: '我的学习', isShow: true },
      // { id: 5, url: '../mypoints/mypoints', img: '../../static/personalCenter/person05.png', text: '我的积分', isShow: true},
      // { id: 6, url: '../partyGroupService/partyGroupService', img: '../../static/tabbar_icon/bottom_icon04.png', text: '党群服务', isShow: true },
      { id:2, url: '../rubbish/index', img: '../../static/images/rubbish.svg', text: '垃圾分类', isShow: true  },
      { id: 3, url: '../onlineElection/index', img: '../../static/personalCenter/person08.png', text: '在线选举' ,isShow: true },
    ],
    tabLists:[]
  },

  /**
   * method
   */
  statusOn() {
    console.log('点击了状态图标:::::::', this);
  },
  jump(e) {
    let that = this;
    app.globalData.checkRegister(app.globalData.personInfo.if_register)
   
    //未检测到用户
    if (app.globalData.personInfo.if_register == 2) {
      return;
    }
    let index = e.currentTarget.id;
    let name = e.currentTarget.dataset.name
    if (name == '垃圾分类' || name == '工作一览') {
      wx.request({
        url: app.globalData.api + '/mini/permission/permission_list',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: app.globalData.personInfo.openid
        },
        success: function (res) {
          let result = res.data.data;
          if (result.length > 0) {
            result.map((item) => {
              if (item.module_name == name) {
                    wx.navigateTo({
                      url: that.data.jumpData[index].url
                    })
                }else{
                  if(result.length < 2){
                    wx.showToast({
                      title: '暂无权限',
                      duration: 1500
                    })
                  }
                   
                }
            })
          } else {
            wx.showToast({
              title: '暂无权限',
              duration: 1500
            })
          }

        },
        error: function (err) {
          console.log(err)
        }

      })
    }else{
       wx.navigateTo({
          url: this.data.jumpData[index].url,
        })
    }
 
 
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
        let arr = [];
        this.data.jumpData.map((item) => {
             arr.push(item.text)
        })
        this.setData({
          tabLists:arr
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //  if(app.globalData.personInfo){
  //    this.initTabs()
  //  }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.reLogin();
     let _this = this;
     
      setTimeout(function(){
        console.log(app.globalData.userInfo,456)
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
            // _this.initTabs()
          }
        }, 500);
      },1000)
  },

  initTabs(){
    let _this = this;
    wx.request({
      url: app.globalData.api + '/mini/permission/permission_list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: app.globalData.personInfo.openid
      },
      success: function (res) {
        let result = res.data.data;
        _this.data.jumpData.map((jump,index) => {
          result.map((item) => {
            if (jump.text == item.module_name){
                _this.data.jumpData[index].isShow = true
            }
          })
        })
        _this.setData({
          jumpData: _this.data.jumpData
        })

      },
      error: function (err) {
        console.error(error)
      }
    })
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