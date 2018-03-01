const express = require('express');
const model = require('../models');
var bcrypt = require('bcrypt');

const helper = require('../helpers');
const recipe = require('./recipe');
const ingredient = require('./ingredient');

const routes = express.Router();

routes.use('/recipe', recipe);
routes.use('/ingredient', ingredient);

routes.get('/', helper.isLogin, (req,res)=>{
    res.redirect('/user')
})

routes.get('/login', helper.redirectIfLoggedIn, (req, res) => {
    let err = req.query.err;
    res.render('login', {err:err, isLogin:req.session.isLogin})
});

routes.post('/login', (req, res) => {
    let email = req.body.email
    model.User.findAll({where:{email:email}})
    .then(user => {
        if(user.length === 1) {
            let password = req.body.password
            if(bcrypt.compareSync(password, user[0].password)) {
                req.session.isLogin = true;
                req.session.userIdLogin = user[0].id
                res.redirect('/user')
            } else{
                reject();
            }
        }
        else {reject()  }
    })
    .catch((err) => {
        res.redirect('/login?err=kesalahan dalam login')
    })
});

routes.get('/register', helper.redirectIfLoggedIn, (req, res) => {
    let err = req.query.err || '';
    let newUser = {
        firstName:req.query.firstName || '',
        lastName:req.query.lastName || '',
        email:req.query.email || '',
    }
    res.render('register', {err:err, data:newUser, isLogin:req.session.isLogin})
});

routes.post('/register', (req, res) => {

    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;

    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);

    const newAcc = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    };
    model.User.create(newAcc)
    .then(() => res.redirect('/'))
    .catch((err) => {
        res.redirect(`/register?err=${err}&firstName=${newAcc.firstName}&lastName=${newAcc.lastName}`)
    })
});

routes.get('/logout', helper.isLogin, (req, res) => {
    req.session.destroy()
    res.redirect('/user');
})

module.exports = routes;
//