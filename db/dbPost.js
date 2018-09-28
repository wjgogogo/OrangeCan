import {getDiffTime} from "../util/util"

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

    getCommentData() {
        let comments = this.getPostItemById().data.comments;
        comments.sort((value1, value2) => parseFloat(value2.create_time) - parseFloat(value1.create_time))
        comments.forEach(comment => {
            comment.create_time = getDiffTime(comment.create_time, true);
        });
        return comments;
    }

    collect() {
        return this.updatePostData('collect');
    }

    up() {
        return this.updatePostData('up');
    }

    newComment(data){
        this.updatePostData('comment',data);
    }

    updatePostData(category,comment) {
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
            case 'up':
                if (!data.upStatus) {
                    data.upNum++;
                    data.upStatus = true;
                } else {
                    data.upNum--;
                    data.upStatus = false;
                }
                break;
            case 'comment':
                data.comments.push(comment);
                data.commentNum++;
                break;
            case 'reading':
                data.readingNum++;
                break;
            default:
                break;
        }
        allData[index] = data;
        this.execSetStorageSync(allData);
        return data;
    }
    addReadingTimes(){
        this.updatePostData('reading')
    }
}

export default DBPost;