require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
