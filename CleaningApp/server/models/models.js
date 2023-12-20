const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  googleId: {type: DataTypes.STRING, allowNull: true},
  facebookId: {type: DataTypes.STRING, allowNull: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

const News = sequelize.define('news', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false}
});

const Service = sequelize.define('service', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
  rate_description: {type: DataTypes.STRING, allowNull: false},
});


User.hasMany(Rating);
Rating.belongsTo(User);

Type.hasMany(Service);
Service.belongsTo(Type);

Service.hasMany(Rating);
Rating.belongsTo(Service);

module.exports = {
    User,
    Service,
    Type,
    Rating,
    News
}
