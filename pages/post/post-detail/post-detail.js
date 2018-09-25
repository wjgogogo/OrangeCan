import DBPost from "../../../db/dbPost";

Page({
    onLoad: function (options) {
        const postId = options.id;
        this.dbPostData = new DBPost(postId).getPostItemById();
        this.setData({...this.dbPostData})
    },

    onReady: function () {
        wx.setNavigationBarTitle({title: this.data.data.title})
    }
});