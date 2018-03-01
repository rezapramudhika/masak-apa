const express = require('express');
const routes = express.Router();
const recipe = require('./recipe');
const ingredient = require('./ingredient');

routes.use('/recipe', recipe);
routes.use('/ingredient', ingredient);

routes.get('/', (req,res)=>{
    res.send('Hello World');
})

module.exports = routes;