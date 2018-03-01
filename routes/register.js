"use strict"
const express = require('express');
const model = require('../models');

const register = express.Router();

register.get('/', (req, res) => {
    res.render('register', {isLogin:req.session.isLogin})
});

register.post('/', (req, res) => {
    let newAcc = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(newAcc)
    model.User.create(newAcc)
    .then(() => res.redirect('/'))
});

module.exports = register