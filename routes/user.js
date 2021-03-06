"use strict"
const express = require('express');
const model =require('../models');
const helper = require('../helpers');
const user = express.Router();

user.get('/', helper.isLogin, (req, res) => {
    let id = req.session.userIdLogin;
    model.User.findById(id)
    .then(user => res.render('user', {user:user, isLogin:req.session.isLogin}))
    .catch((err) => console.log(err))
});

user.get('/edit', helper.isLogin, (req, res) => {
    let id = req.session.userIdLogin;
    model.User.findById(id)
    .then(user => res.render('userEdit', {user:user, isLogin:req.session.isLogin}));
});

user.post('/edit', (req, res) => {
    let id = req.session.userIdLogin;
    let updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    model.User.update(updatedData, {where:{id:id}})
    .then(() => {
        res.redirect('/user')
    })
    .catch((err) => {
        console.log(err)
    })
});

user.get('/delete', helper.isLogin, (req, res) => {
    let id = req.session.userIdLogin;
    model.User.findById(id)
    .then(user => {
        req.session.userIdLogin = null;
        req.session.isLogin = false;
        user.destroy()
        .then(() => {
            res.redirect('/')
        })
    })
})

module.exports = user;