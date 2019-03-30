const axios = require('axios');
const moment = require('moment')
// const baseUrl = 'http://localhost:8888/'
const baseUrl = 'https://www.bestlifebestyue.com/admin-api/'

const callbackDiary = async ctx => {
    function getData() {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'api/getArticleList?articleType=diary&articleStatus=1&pageSize=10&currentPage=1').then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    var data = await getData()
    await ctx.render('pages/home', {
        title: "diary | XYTang",
        hasArticle: data.data.articleList.length > 0? true: false,
        headerTagList: [
            {
                title: '日记',
                url: '/',
                className: 'active'
            },
            {
                title: '文章',
                url: '/article',
                className: 'default'
            },
            {
                title: '留言',
                url: '/words',
                className: 'default'
            }
        ],
        articleList: data.data.articleList.map((item, index) => {
            let newObj = {}
            for (let i in item) {
                if (i != 'articleCreatedTime') {
                    newObj[i] = item[i]
                } else {
                    newObj[i] = moment(item[i]).format('YYYY-MM-DD HH:mm')
                }
            }
            return newObj
        })
    })
}
const callbackDiaryDetail = async ctx => {
    const id = ctx.params.id
    function getData() {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'api/getArticleDetail?from=cli&id=' + id).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    var data = await getData()
    const newObj = {}
    if (data.data != 0) {
        for (let i in data.data) {
            newObj[i] = data.data[i]
            if (i = 'articleCreatedTime') {
                newObj[i] = moment(newObj[i]).format('YYYY-MM-DD HH:mm')
            }
        }
    }
    await ctx.render('pages/diary-detail', {
        title: "detail | XYTang",
        hasArticle: data.data == 0? false: true,
        headerTagList: [
            {
                title: '日记',
                url: '/',
                className: 'default'
            },
            {
                title: '文章',
                url: '/article',
                className: 'default'
            },
            {
                title: '留言',
                url: '/words',
                className: 'default'
            }
        ],
        article: newObj
    })
}

const callbackActicle = async ctx => {
    function getData() {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'api/getArticleList?articleType=article&articleStatus=1&pageSize=10&currentPage=1').then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    var data = await getData()
    await ctx.render('pages/home', {
        title: "article | XYTang",
        hasArticle: data.data.articleList.length > 0? true: false,
        headerTagList: [
            {
                title: '日记',
                url: '/',
                className: 'default'
            },
            {
                title: '文章',
                url: '/article',
                className: 'active'
            },
            {
                title: '留言',
                url: '/words',
                className: 'default'
            }
        ],
        articleList: data.data.articleList.map((item, index) => {
            let newObj = {}
            for (let i in item) {
                if (i != 'articleCreatedTime') {
                    newObj[i] = item[i]
                } else {
                    newObj[i] = moment(item[i]).format('YYYY-MM-DD HH:mm')
                }
            }
            return newObj
        })
    })
}

const callbackWords = async ctx => {
    await ctx.render('pages/words', {
        title: "words | XYTang",
        headerTagList: [
            {
                title: '日记',
                url: '/',
                className: 'default'
            },
            {
                title: '文章',
                url: '/article',
                className: 'default'
            },
            {
                title: '留言',
                url: '/words',
                className: 'active'
            }
        ]
    })
}


module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackDiary
    },
    {
        method: 'GET',
        path: '/diary/:id',
        cbFnc: callbackDiaryDetail
    },
    {
        method: 'GET',
        path: '/article',
        cbFnc: callbackActicle
    },
    {
        method: 'GET',
        path: '/words',
        cbFnc: callbackWords
    }
]