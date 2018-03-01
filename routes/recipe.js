const express = require('express');
const routes = express.Router();
const models = require('../models')

routes.get('/', (req,res)=>{
    models.Recipe.findAll({
        include: [{model: models.Ingredient}]
    })
        .then(recipes => {
            res.render('recipe.ejs', {recipe: recipes, isLogin:req.session.isLogin});
        })
});

module.exports = routes;