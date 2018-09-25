import DBPost from "../../db/dbPost";

Page({
    data: {
        title: "post"
    },

    onLoad: function (options) {
        console.log("onLoad");
        let dbPost = new DBPost();
        this.setData({postList: dbPost.getAllPostData()});
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