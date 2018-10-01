import {http, convertToCastString, convertToStarsArray, convertToCastInfos} from "../../../util/util";

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading:true,
        movie: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const movieId = options.id;
        const url = `${app.globalData.doubanBase}/v2/movie/subject/${movieId}`;
        http(url, this.processDoubanData);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: ""
        });
        wx.showNavigationBarLoading();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    processDoubanData: function (data) {
        console.log(data);
        if (!data) {
            return;
        }
        let director = {
            avatar: "",
            name: "",
            id: ""
        };
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        let movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: convertToCastString(data.casts),
            castsInfo: convertToCastInfos(data.casts),
            summary: data.summary
        };
        this.setData({
            movie: movie
        });
        wx.setNavigationBarTitle({
            title: data.title
        });
        wx.hideNavigationBarLoading();
        this.setData({
            loading:false
        })
    },
    viewMoviePostImg: function (event) {
        const src = event.currentTarget.dataset.src;
        wx.previewImage({
            current: src,
            urls: [src]
        })
    }
});