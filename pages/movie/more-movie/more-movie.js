import {convertToStarsArray, http} from "../../../util/util"

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let category = options.category;
        let dataUrl = app.globalData.doubanBase;
        switch (category) {
            case "正在热映":
                dataUrl += "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl += "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl += "/v2/movie/top250";
                break;
        }
        this.setData({
            requestUrl: dataUrl
        });
        http(dataUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
    onPullDownRefresh: function (event) {
        let refreshUrl = this.data.requestUrl + "?star=0&count=20";
        this.data.movies = [];
        http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let totalCount = this.data.movies.length;
        let nextUrl = `${this.data.requestUrl}?start=${totalCount}&count=20`;
        http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    processDoubanData: function (moviesDouban) {
        let movies = [];
        moviesDouban.subjects.forEach(subject => {
            let title = subject.title;
            if (title.length > 6) {
                title = title.substring(0, 6) + '...'
            }
            let temp = {
                stars: convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            };
            movies.push(temp);
        });
        this.setData({
            movies: this.data.movies.concat(movies)
        });
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
    },
    onMovieTap:function (event) {
        const movieId=event.currentTarget.dataset.movieId;
        wx.navigateTo({
            url:`../movie-detail/movie-detail?id=${movieId}`
        })
    }

});