const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const helper = require('../helpers');
const Op = Sequelize.Op;

routes.get('/', helper.isLogin, (req,res)=>{
    let ingredientIdArr = [];
    models.UserIngredient.getIngredientId(req.session.userIdLogin)
    .then(data => {
        for(let i=0; i<data.length; i++){
            ingredientIdArr.push(data[i].IngredientId);
        }
        models.RecipeIngredient.findAll({
            include: [{
                model: models.Recipe,
                include: models.Ingredient
            }],
            where: {
                IngredientId: {[Op.in]: ingredientIdArr}
            },
        })
        .then(recipes => {
            res.render('recipe.ejs', {recipe: recipes, isLogin:req.session.isLogin});
        })
    })
    .catch(err => {console.log(err);})
});

routes.get('/:id/cook', helper.isLogin, (req, res) => {
    let recipeId = req.params.id
    models.RecipeIngredient.findAll({where: {RecipeId: recipeId}})
    .then(ingredients => {
        let usedIngredients = [];
        ingredients.forEach((ingredient) => {
            usedIngredients.push(ingredient.IngredientId);
        })
        usedIngredients.forEach(ingredient => {
            models.UserIngredient.findOne({where: {IngredientId:ingredient}})
            .then(data => {data.destroy()})
            .catch(err => console.log(err))
        })
        res.redirect('/recipe');
    })
})
module.exports = routes;