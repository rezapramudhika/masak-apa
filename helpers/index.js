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

function instructionsAdjuster(text) {
    text = text.split('\n')
    console.log(text)
    return text
}

module.exports = {
    isLogin:isLogin,
    redirectIfLoggedIn:redirectIfLoggedIn,
    instructionsAdjuster:instructionsAdjuster
}