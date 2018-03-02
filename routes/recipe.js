const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.get('/', (req,res)=>{
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
                            IngredientId: {
                                [Op.in]: ingredientIdArr
                            }
                        },
                    })
                        .then(recipes => {
                            res.render('recipe.ejs', {recipe: recipes, isLogin:req.session.isLogin});
                        })
                })
});

module.exports = routes;