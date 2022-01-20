
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const MenuItem = require('./menu_item');
const MenuRecipe = require('./menu_recipe');
const IngredientItem = require('./ingredient_item');
const Expense = require('./expense');
const Sales = require('./sales');

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Comment = Comment;
db.MenuItem = MenuItem;
db.MenuRecipe = MenuRecipe;
db.IngredientItem = IngredientItem;
db.Expense = Expense;
db.Sales = Sales;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
MenuItem.init(sequelize);
MenuRecipe.init(sequelize);
IngredientItem.init(sequelize);
Expense.init(sequelize);
Sales.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
MenuItem.associate(db);
MenuRecipe.associate(db);
IngredientItem.associate(db);
Expense.associate(db);
Sales.associate(db);

module.exports = db;
