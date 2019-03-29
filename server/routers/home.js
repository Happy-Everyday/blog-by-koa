const axios = require('axios');
const baseUrl = 'http://localhost:8888/'

const callbackHome = async ctx => {
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
    // getData.then((res) => {
    //     data = res.data
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })
    console.log(data)
    console.log(data.data.articleList)
    await ctx.render('home', {
        title: "diary | XYTang",
        name: "World",
        headerTagList: [
            {
                title: '日记',
                className: 'active'
            },
            {
                title: '文章',
                className: 'default'
            },
            {
                title: '留言',
                className: 'default'
            }
        ]
    })
}

module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackHome
    }
]