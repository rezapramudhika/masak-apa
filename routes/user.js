"use strict"
const express = require('express');
const model =require('../models')

const user = express.Router();

user.get('/', (req, res) => {
    let id=1;
    res.redirect(`/user/${id}`);
})

user.get('/:id', (req, res) => {
    let id = req.params.id;
    model.User.findById(id)
    .then(user => res.render('user', {user:user}))
});

user.get('/:id/edit', (req, res) => {
    let id = req.params.id
    model.User.findById(id)
    .then(user => res.render('userEdit', {user:user}));
});

module.exports = user;