const data = require("../../data/postData.js");
Page({
    data: {
        title: "post"
    },

    onLoad: function (options) {
        console.log("onLoad");
        this.setData({postList: data.postList});
    },

    onReady: function () {
        console.log("onReady")
    },

    onShow: function () {
        console.log("onShow")
    },

    onHide: function () {
        console.log("onHide")
    },

    onUnload: function () {
        console.log("onUnload")
    }
});