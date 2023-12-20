const express = require('express');
require('dotenv').config();
require('./googleAuth.js')
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./db');
const router = require('./routes/index');
const path = require('path');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({origin: true}));
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(passport.initialize());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  } catch (err) {
    console.log(err);
  }
}

start();