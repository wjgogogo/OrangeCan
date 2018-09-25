App({
    onLaunch: function () {
        const storage = wx.getStorageSync('postList');
        if (!storage) {
            const data = require("data/postData.js");
            wx.clearStorageSync();
            wx.setStorageSync('postList', data.postList);
        }
    }
});