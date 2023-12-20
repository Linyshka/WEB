const Router = require('express');
const router = new Router();
const serviceRouter = require('./serviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const newsRouter = require('./newsRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/service', serviceRouter);
router.use('/news', newsRouter);

module.exports = router