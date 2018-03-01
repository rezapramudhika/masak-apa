const express = require('express');
const routes = express.Router();
const models = require('../models')

routes.get('/', (req,res)=>{
    models.Recipe.findAll({
        include: [{model: models.Ingredient}]
    })
        .then(recipes => {
            // res.send(recipes);
            res.render('recipe.ejs', {recipe: recipes, isLogin:req.session.isLogin});
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = routes;