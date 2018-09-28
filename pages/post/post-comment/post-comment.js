import DBPost from "../../../db/dbPost";

const MAX_IMG_COUNT = 3;
Page({
    data: {
        useKeyboardFlag: false,
        sendMoreMsgFlag: false,
        keyboardInputValue: "",
        chooseFiles: [],
        deleteIndex:-1,
        currentAudio:""
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
                img:this.data.chooseFiles
            }
        };

        if (!data.content.txt && data.content.img.length===0) {
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
            keyboardInputValue: "",
            chooseFiles:[],
            sendMoreMsgFlag:false
        })
    },
    sendMoreMsg: function () {
        this.setData({
            sendMoreMsgFlag: !this.data.sendMoreMsgFlag
        })
    },
    chooseImage: function (event) {
        let leftCount = MAX_IMG_COUNT - this.data.chooseFiles.length;
        if (leftCount <= 0) {
            return;
        }

        const sourceType=[event.currentTarget.dataset.category];
        const _this=this;
        wx.chooseImage({
            count:leftCount,
            source:sourceType,
            success:function (res) {
                _this.setData({
                    chooseFiles: _this.data.chooseFiles.concat(res.tempFilePaths)
                })
            }
        })
    },
    deleteImage:function (event) {
        const idx=event.currentTarget.dataset.idx;
        this.data.chooseFiles.splice(idx,1);
        this.setData({
            deleteIndex:idx
        });
        const _this=this;
        setTimeout(function () {
            _this.setData({
                deleteIndex:-1,
                chooseFiles:_this.data.chooseFiles
            })
        },500)

    },
    recordStart:function () {
        let _this=this;
        this.setData({
            recodingClass:'recoding'
        });
        this.startTime=new Date();
        wx.startRecord({
            success:function (res) {
                let diff=Math.ceil((_this.endTime-_this.startTime)/1000);
                _this.submitVoiceComment({url:res.tempFilePath,timeLen:diff})
            }
        })
    },
    recordEnd:function () {
        this.setData({
            recodingClass:''
        });
        this.endTime=new Date();
        wx.stopRecord();
    },
    submitVoiceComment:function (audio) {
        let data = {
            username: '青石',
            avatar: '/images/avatar/avatar-3.png',
            create_time: new Date().getTime() / 1000,
            content: {
                txt: "",
                img:[],
                audio
            }
        };
        this.dbPost.newComment(data);
        this.showCommentSuccessToast();
        this.bindCommentData();
    },
    playAudio:function (event) {
        let url=event.currentTarget.dataset.url;
        let _this=this;
        if(url===this.data.currentAudio){
            wx.pauseVoice();
        }
        else{
            this.data.currentAudio=url;
            wx.playVoice({
                filePath:url,
                complete:function () {
                    _this.data.currentAudio=""
                }
            })
        }
    }


});

