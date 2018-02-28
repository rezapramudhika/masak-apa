const express = require('express');
const routes = express.Router();
const model = require('../models')

routes.get('/', (req,res)=>{
    res.send('Hello World');
})

routes.get('/login', (req, res) => {
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
    .catch(err => res.redirect('/login?err=kesalahan dalam login'))
});

module.exports = routes;