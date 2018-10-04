// pages/setting/document/download/download.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileTypeList: [
            {type: 'pdf', iconurl: '/images/icon/wx_app_pdf.png', title: 'pdf类型'},
            {type: 'word', iconurl: '/images/icon/wx_app_word.png', title: 'word类型'},
            {type: 'excel', iconurl: '/images/icon/wx_app_exl.png', title: 'excel类型'},
            {type: 'ppt', iconurl: '/images/icon/wx_app_ppt.png', title: 'ppt类型'}
        ]
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
    downloadFile:function (event) {
        let type=event.currentTarget.dataset.type;
        let url="https://coding.net/u/airbreak/p/wx_app_files/git/raw/master/top10.";
        switch (type) {
            case "pdf":
                url+="pdf";
                break;
            case "word":
                url+="docx";
                break;
            case "excel":
                url+="xlsx";
                break;
            default:
                url+="pptx";
                break;
        }

        wx.downloadFile({
            url,
            success:function (res) {
                console.log(res)
                let filePath=res.tempFilePath;
                wx.openDocument({
                    filePath,
                    success:function (res) {
                        console.log('open success')
                    }
                })
            },
            fail:function (err) {
                console.log(err)
            }
        })
    }
})