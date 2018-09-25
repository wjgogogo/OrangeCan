class DBPost {
    constructor() {
        this.storageKeyName = 'postList';
    }

    getAllPostData() {
        let storage = wx.getStorageSync(this.storageKeyName);
        if (!storage) {
            storage = require('../data/postData').postList;
            this.execSetStorageSync(storage);
        }
        return storage;
    }

    execSetStorageSync(data) {
        wx.setStorageSync(this.storageKeyName, data);
    }
}

export  default DBPost;