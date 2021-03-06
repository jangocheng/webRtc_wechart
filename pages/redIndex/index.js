//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    src: '../../static/images/earth.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    let _this = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.userInfoWX = e.detail;

      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.url + 'getWxUserInfo',
            method: 'GET',
            data: {
              code: res.code,
              iv: app.globalData.userInfoWX.iv,
              encryptedData: app.globalData.userInfoWX.encryptedData
            },
            success: function (resp) {
              if (resp.statusCode == 200) {
                app.globalData.openid = resp.data.data.openid;

                console.log(app.globalData.personInfo.if_register)
                if (app.globalData.personInfo.if_register == 2) {
                  _this.checkUserAuth()
                } else {
                  wx.navigateTo({
                    url: '/pages/redSelect/index'
                  })
                }
              }
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '重新授权',
        icon: 'success',
        duration: 2000
      })
    }
  },
  checkUserAuth: function () {
    let _this = this;
    app.globalData.checkRegister(app.globalData.personInfo.if_register)

    //未检测到用户
    if (app.globalData.personInfo.if_register == 2) {
      return;
    }
    setTimeout(function () {
      if (!app.globalData.personInfo) {
        app.getPersonInfo();
        setTimeout(function () {
          _this.getPersonInfo();
        }, 500);
      } else {
        _this.getPersonInfo();
      }
    }, 500);

  },
  // 获取用户信息-from 接口
  getPersonInfo() {
    let _this = this;
    wx.request({
      url: app.globalData.url + `user/info?id=${app.globalData.personInfo.id}`,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          app.globalData.personInfo = res.data.data
        }
      }
    });
  },
  // 打开足迹特别版
  goSpecial() {
    wx.navigateTo({
      url: "../redIndexSpecial/special"
    })
  }
})
