const express = require("express");
const app = express();
const user = require('./routes/user');
const post = require('./routes/post');
const comment = require('./routes/comment');
const menu_item = require('./routes/menu_item');
const menu_recipe = require('./routes/menu_recipe');
const ingredient_item = require('./routes/ingredient_item');
const auth = require('./routes/auth');
const expense = require('./routes/expense');
const sales = require('./routes/sales');

const {sequelize} = require('./models');



sequelize.sync({force: false})
    .then(()=> {
        console.log('success');
    })
    .catch((err)=>{
        console.error(err)
    })
app.set('port', process.env.PORT || 3306);
app.use('/user', user);
app.use('/post', post);
app.use('/comment', comment);
app.use('/menu_item', menu_item);
app.use('/menu_recipe', menu_recipe);
app.use('./ingredient_item', ingredient_item);
app.use('/auth', auth);
app.use('/expense', expense);
app.use('/sales', sales);

app.listen(80, () => {
    console.log("the server is running")
});