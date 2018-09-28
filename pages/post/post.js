import DBPost from "../../db/dbPost";

Page({
    onShow:function(){
        let dbPost = new DBPost();
        this.setData({postList: dbPost.getAllPostData()});
    },

    onTapToDetail: function (event) {
        const postId = event.currentTarget.dataset.postId;
        wx.navigateTo({
            url: `post-detail/post-detail?id=${postId}`
        })
    }
});