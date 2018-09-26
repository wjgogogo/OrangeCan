import DBPost from "../../../db/dbPost";

Page({
    onLoad: function (options) {
        const postId = options.id;
        this.dbPost = new DBPost(postId);
        this.setData({...this.dbPost.getPostItemById()})
    },

    onReady: function () {
        wx.setNavigationBarTitle({title: this.data.data.title})
    },
    onCollectionTap:function () {
        let data=this.dbPost.collect();
        this.setData({
            'data.collectionStatus':data.collectionStatus,
            'data.collectionNum':data.collectionNum
        });
        wx.showToast({
            title: data.collectionStatus?"收藏成功":"取消收藏",
        })
    }
});