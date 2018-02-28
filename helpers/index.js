function isLogin(req, res, next) {
    // console.log(req.session)
    console.log("Masuk middleware")
    if(req.session.isLogin && req.session.userIdLogin) {
        next();
    }
    else {
        res.redirect('/login')
    }
    
}

module.exports = {
    isLogin:isLogin,
}