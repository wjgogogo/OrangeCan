import DBPost from "../../../db/dbPost";

Page({
    data: {
        useKeyboardFlag: true,
        keyboardInputValue: "",
    },
    onLoad: function (options) {
        const postId = options.id;
        this.dbPost = new DBPost(postId);
        this.setData({comments: this.dbPost.getCommentData()})
    },
    previewImg: function (event) {
        const commentIdx = event.currentTarget.dataset.commentIdx;
        const imgIdx = event.currentTarget.dataset.imgIdx;
        const imgs = this.data.comments[commentIdx].content.img;
        console.log(commentIdx, imgIdx, imgs)
        wx.previewImage({
            urls: imgs,
            current: imgs[imgIdx]
        })
    },
    switchInputType: function () {
        this.setData({
            useKeyboardFlag: !this.data.useKeyboardFlag
        })
    },
    bindCommentInput: function (event) {
        this.data.keyboardInputValue = event.detail.value;
    },
    submitComment: function (event) {
        let data = {
            username: '青石',
            avatar: '/images/avatar/avatar-3.png',
            create_time: new Date().getTime() / 1000,
            content: {
                txt: this.data.keyboardInputValue,
            }
        };

        if (!data.content.txt) {
            return;
        }

        this.dbPost.newComment(data);
        this.showCommentSuccessToast();
        this.bindCommentData();
        this.resetAllDefaultStatus();
    },
    showCommentSuccessToast: function () {
        wx.showToast({
            title: "评论成功！"
        })
    },
    bindCommentData: function () {
        const comments = this.dbPost.getCommentData();
        this.setData({
            comments
        })
    },
    resetAllDefaultStatus: function () {
        this.setData({
            keyboardInputValue: ""
        })
    }
});

