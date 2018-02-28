"use strict"
const express = require('express');
const model =require('../models');
const helper = require('../helpers')
const user = express.Router();user.get('/', helper.isLogin, (req, res) => {
    let id = req.session.userIdLogin;
    model.User.findById(id)
    .then(user => res.render('user', {user:user}))
    .catch((err) => console.log(err))//res.redirect('/login'))
});

user.get('/:id/edit', (req, res) => {
    let id = req.params.id
    model.User.findById(id)
    .then(user => res.render('userEdit', {user:user}));
});

user.post('/:id/edit', (req, res) => {
    let id = req.params.id;
    let updatedData = {
        name: request.body.name,
        email: request.body.email
    }
    console.log(updatedData, id)
    model.User.update(updatedData, {where:{id:id}})
});

module.exports = user;