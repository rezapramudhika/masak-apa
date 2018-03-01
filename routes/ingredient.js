const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.get('/', (req,res)=>{
    let keyword = req.query.keyword;
    let userId = req.session.userIdLogin;
    models.Ingredient.findAll({
        where: {
            name: {
                [Op.iLike]: '%'+req.query.keyword+'%'}
        }
    }).then(ingredients => {
        models.UserIngredient.findAll({
            where: {UserId: req.session.userIdLogin},
            include: [{model: models.Ingredient}]
        }).then(userIngredients => {
            res.render('ingredient.ejs', {ingredients: ingredients, isLogin:req.session.isLogin, userId: req.session.userIdLogin, userIngredients: userIngredients})
        })
        // 
    })
    
});

routes.post('/:idUser/add/:idIngredient', (req,res)=>{
    models.UserIngredient.create({
        UserId: req.params.idUser,
        IngredientId: req.params.idIngredient
    })
        .then(()=>{
            res.redirect('/ingredient');
        })
});

routes.post('/delete/:idIngredient', (req,res) => {
    models.UserIngredient.findOne({
        where: {UserId: req.session.userIdLogin, IngredientId: req.params.idIngredient}
    })
        .then((userIngredient)=>{
            userIngredient.destroy()
                .then(()=>{
                    res.redirect('/ingredient')
                })
        })
});


module.exports = routes;