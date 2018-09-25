Page({
    onTapJump: function (event) {
        wx.redirectTo({
            url: "../post/post",
            success: function () {
                console.log("success")
            },
            fail: function () {
                console.log("fail")
            },
            complete: function () {
                console.log("complete")
            }
        })
    },

    onHide:function () {
        console.log("welcome hide");
    },

    onUnload:function () {
        console.log("welcome unload");
    }
})