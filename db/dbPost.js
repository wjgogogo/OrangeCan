class DBPost {
    constructor(postId = 0) {
        this.storageKeyName = 'postList';
        this.postId = postId;
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

    getPostItemById() {
        const dataList = this.getAllPostData();
        const index = dataList.findIndex(data => data.postId == this.postId);
        return {
            index,
            data: dataList[index]
        }
    }
}

export default DBPost;