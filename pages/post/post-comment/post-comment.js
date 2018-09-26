import DBPost from "../../../db/dbPost";

Page({
    onLoad: function (options) {
        const postId = options.id;
        this.dbPost = new DBPost(postId);
        this.setData({comments:this.dbPost.getCommentData()})
    },


});