const express = require('express');
const routes = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.get('/', (req,res)=>{
    // models.Recipe.findAll({
    //     include: [{model: models.Ingredient}]
    // })
    //     .then(recipes => {
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
                        // group: [RecipeId]
                    })
                        .then(recipes => {
                            res.render('recipe.ejs', {recipe: recipes, isLogin:req.session.isLogin});
                            // res.send({recipes: recipes, data: data})
                        })
                    // res.send(data);
                })
            
        // })
        // .catch(err => {
        //     console.log(err);
        // })
});

module.exports = routes;