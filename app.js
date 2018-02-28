const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const routes = require('./routes');
const register = require('./routes/register');
const user = require('./routes/user')

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.locals.helper = require('./helpers');

app.use('/', routes);
app.use('/register', register);
app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})