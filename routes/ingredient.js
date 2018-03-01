const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.get('/', (req,res)=>{
    let keyword = req.query.keyword;
    if(keyword = ''){
        res.render('ingredient.ejs', {ingredients: ''})
    }else{
        models.Ingredient.findAll({
            where: {
                name: {
                    [Op.iLike]: '%'+req.query.keyword+'%'}
            }
        }).then(ingredients => {
            res.render('ingredient.ejs', {ingredients: ingredients})
        })
    }
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


module.exports = routes;