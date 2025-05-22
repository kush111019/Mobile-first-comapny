const Sequelize = require('sequelize');
const config = require('../config/database.js')['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.Order = require('./order')(sequelize, Sequelize.DataTypes);
db.OrderItem = require('./orderItem')(sequelize, Sequelize.DataTypes);
db.Cart = require('./cart')(sequelize, Sequelize.DataTypes);

// Cart Associations
db.Cart.belongsTo(db.User, { foreignKey: 'userId' });
db.Cart.belongsTo(db.Product, { foreignKey: 'productId' });

db.User.hasMany(db.Cart, { foreignKey: 'userId' });
db.Product.hasMany(db.Cart, { foreignKey: 'productId' });

// Order Associations
db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

// OrderItem Associations
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'items' });

db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });


db.Product.hasMany(db.OrderItem, { foreignKey: 'productId' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'productId' });

// Call associate() in each model if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
