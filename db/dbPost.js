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

    collect() {
        return this.updatePostData('collect');
    }

    updatePostData(category) {
        let [itemData, allData] = [this.getPostItemById(), this.getAllPostData()];
        let {data, index} = itemData;
        switch (category) {
            case 'collect':
                if (!data.collectionStatus) {
                    data.collectionNum++;
                    data.collectionStatus = true;
                } else {
                    data.collectionNum--;
                    data.collectionStatus = false;
                }
                break;
            default:
                break;
        }
        allData[index] = data;
        this.execSetStorageSync(allData);
        return data;
    }
}

export default DBPost;