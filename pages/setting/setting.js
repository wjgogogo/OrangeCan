Page({

    /**
     * 页面的初始数据
     */

    data: {
        cache: [
            {iconurl: '/images/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache'}
        ],
        device: [
            {iconurl: '/images/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo'},
            {iconurl: '/images/icon/wx_app_network.png', title: '网络状态', tap: 'showNetWork'},
            {iconurl: '/images/icon/wx_app_location.png', title: '地图显示', tap: 'showMap'},
            {iconurl: '/images/icon/wx_app_compass.png', title: '指南针', tap: 'showCompass'},
            {iconurl: '/images/icon/wx_app_lonlat.png', title: '当前位置、速度', tap: 'showLonLat'},
            {iconurl: '/images/icon/wx_app_shake.png', title: '摇一摇', tap: 'shake'},
            {iconurl: '/images/icon/wx_app_scan_code.png', title: '二维码', tap: 'scanQRCode'}
        ],
        api: [
            {iconurl: '/images/icon/wx_app_list.png', title: '下载pdf、word文档', tap: 'downloadDocumentList'},
            {iconurl: '', title: '用户登陆', tap: 'login'},
            {iconurl: '', title: '校验用户信息', tap: 'check'},
            {iconurl: '', title: '获取用户加密信息', tap: 'decrypted'},
            {iconurl: '', title: '模板消息', tap: 'tplMessage'},
            {iconurl: '', title: '微信支付', tap: 'wxPay'}
        ],
        others: [
            {iconurl: '', title: 'wx:key示例', tap: 'showWxKeyDemo'},
            {iconurl: '', title: 'scroll-view高级用法演示', tap: 'showScrollViewDemo'}
        ],
        compassVal: 0,
        compassHidden: true,
        shakeInfo: {
            gravityModalHidden: true,
            num: 0,
            enabled: false
        },
        shakeData: {
            x: 0,
            y: 0,
            z: 0
        },
    },


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

    },

    showModel: function (title, content, callback) {
        wx.showModal({
            title,
            content,
            confirmColor: "#1f4ba5",
            cancelColor: "#7f8389",
            success: function (res) {
                if (res.confirm) {
                    callback && callback();
                }
            }
        })

    },
    clearCache: function () {
        this.showModel("缓存清理","确定要清除本地缓存吗？",function () {
            wx.clearStorage({
                success:function (msg) {
                    wx.showToast({
                        title:"清除缓存完成",
                        duration:1000,
                        mask:true,
                        icon:"suceess"
                    })
                },
                fail:function (err) {
                    console.log(err)
                    
                }
            })
        })
    },
    showSystemInfo:function () {
        wx.navigateTo({
            url:'device/device'
        })
    },
    showNetWork:function () {
        const _this=this;
        wx.getNetworkType({
            success:function (res) {
                let networkType=res.networkType;
                _this.showModel("网络状态",`你当前的网络：${networkType}`)
            }
        })
    }
})