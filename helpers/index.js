function isLogin(req, res, next) {
    if(req.session.isLogin && req.session.userIdLogin) {
        next();
    } else {
        res.redirect('/login')
    }
}

function redirectIfLoggedIn(req, res, next) {
    if(req.session.isLogin && req.session.userIdLogin) {
        res.redirect('/user')
    } else {
        next();
    }
}

module.exports = {
    isLogin:isLogin,
    redirectIfLoggedIn:redirectIfLoggedIn
}