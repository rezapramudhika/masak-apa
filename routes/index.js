const express = require('express');
const routes = express.Router();
const model = require('../models');
const helper = require('../helpers');

routes.get('/', helper.isLogin, (req,res)=>{
    res.send('Hello World');
})

routes.get('/login', helper.redirectIfLoggedIn, (req, res) => {
    let err = req.query.err;
    res.render('login', {err:err})
});

routes.post('/login', (req, res) => {
    model.User.findAll({where:{email:req.body.email, password:req.body.password}})
    .then(user => {
        if(user.length === 1) {
            req.session.isLogin = true;
            req.session.userIdLogin = user[0].id
            res.redirect('/user')
        }
        else {reject()  }
    })
    .catch((err) => {
        res.redirect('/login?err=kesalahan dalam login')
    })
});

routes.get('/register', helper.redirectIfLoggedIn, (req, res) => {
    let err = req.query.err || '';
    let name = req.query.name || '';
    let email = req.query.email || '';    
    res.render('register', {err:err, name:name, email:email})
});

routes.post('/register', (req, res) => {
    let newAcc = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    model.User.create(newAcc)
    .then(() => res.redirect('/'))
    .catch((err) => {
        res.redirect(`/register?err=${err}&name=${newAcc.name}`)
    })
});


module.exports = routes;
//