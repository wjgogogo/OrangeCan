import DBPost from "../../../db/dbPost";

Page({
    onLoad: function (options) {
        const postId = options.id;
        this.dbPost = new DBPost(postId);
        this.setData({comments:this.dbPost.getCommentData()})
    },
    previewImg:function (event) {
        const commentIdx=event.currentTarget.dataset.commentIdx;
        const imgIdx=event.currentTarget.dataset.imgIdx;
        const imgs=this.data.comments[commentIdx].content.img;
        console.log(commentIdx,imgIdx,imgs)
        wx.previewImage({
            urls:imgs,
            current:imgs[imgIdx]
        })
    }


});