import DBPost from "../../../db/dbPost";

Page({
    onLoad: function (options) {
        const postId = options.id;
        this.dbPost = new DBPost(postId);
        this.setData({...this.dbPost.getPostItemById()})
        this.addReadingTimes();
    },

    onReady: function () {
        wx.setNavigationBarTitle({title: this.data.data.title})
    },
    onCollectionTap: function () {
        let data = this.dbPost.collect();
        this.setData({
            'data.collectionStatus': data.collectionStatus,
            'data.collectionNum': data.collectionNum
        });
        wx.showToast({
            title: data.collectionStatus ? "收藏成功" : "取消收藏",
        })
    },
    onUpTap: function () {
        let data = this.dbPost.up();
        this.setData({
            'data.upStatus': data.upStatus,
            'data.upNum': data.upNum
        });
    },
    onCommentTap: function (event) {
        const id = event.currentTarget.dataset.postId;
        wx.navigateTo({
            url: `../post-comment/post-comment?id=${id}`
        })
    },
    addReadingTimes:function () {
        this.dbPost.addReadingTimes();
    }
});