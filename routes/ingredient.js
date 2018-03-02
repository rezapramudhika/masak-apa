const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const helper = require('../helpers');
const Op = Sequelize.Op;

routes.get('/', helper.isLogin, (req,res)=>{
    let keyword = req.query.keyword;
    let userId = req.session.userIdLogin;
    models.UserIngredient.findAll({
        where: {UserId: req.session.userIdLogin},
        include: [{model: models.Ingredient}]
    })
    .then(userIngredients => {
        let listedIngredients = [];
        userIngredients.forEach((ingredient) => {
            listedIngredients.push(ingredient.IngredientId);
        });
        models.Ingredient.findAll({
            where: {
                id: {[Op.notIn]: listedIngredients},
                name: {[Op.iLike]: '%'+req.query.keyword+'%'}
            }
        })
        .then((unListedIngredients) => {
            res.render('ingredient.ejs', {ingredients: unListedIngredients, isLogin:req.session.isLogin, userId: req.session.userIdLogin, userIngredients: userIngredients})
        })
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