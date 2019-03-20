
const callbackHome = async ctx => {
    await ctx.render('home', {
        title: "website",
        name: "World",
        user: 'sessionUser'
    })
}

module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackHome
    }
]