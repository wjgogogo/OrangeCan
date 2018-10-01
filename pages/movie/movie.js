import {convertToStarsArray} from "../../util/util";
const app = getApp();
const inTheatersUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?star=0&count=3`;
const comingSoonUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?star=0&count=3`;
const top250Url = `${app.globalData.doubanBase}/v2/movie/top250?star=0&count=3`;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        containerShow:true,
        searchPanelShow:false,
        searchResult:{},
        inputValue:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣Top250");
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
    getMovieListData: function (url, settedKey, categoryTitle) {
        let _this = this;
        wx.request({
            url,
            method: 'GET',
            header: {
                "content-type": "json"
            },
            success: function (res) {
                console.log(res);
                _this.processDoubanData(res.data, settedKey, categoryTitle)
            },
            fail: function (error) {
                console.log(error)
            }
        })
    },
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
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
        let readyData={};
        readyData[settedKey]={
            categoryTitle:categoryTitle,
            movies:movies
        };
        this.setData(readyData);
    },
    onMoreTap:function (event) {
        let category=event.currentTarget.dataset.category;
        wx.navigateTo({
            url:`more-movie/more-movie?category=${category}`
        })
    },
    onBindFocus:function (event) {
        this.setData({
            containerShow:false,
            searchPanelShow:true
        })
    },
    onBindConfirm:function (event) {
        let keyWord=event.detail.value;
        this.setData({
            inputValue: keyWord
        });
        let searchUrl = `${app.globalData.doubanBase}/v2/movie/search?q=${keyWord}`;
        this.getMovieListData(searchUrl, "searchResult", "");
    },
    onCancelImgTap:function (event) {
        this.setData({
            containerShow:true,
            searchPanelShow:false,
            searchResult:{},
            inputValue:""
        })
    }
})