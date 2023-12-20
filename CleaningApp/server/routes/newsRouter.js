const Router = require('express');
const router = new Router();
const newsController = require('../controllers/newsController');
const checkRole = require('../middleware/checkRoleMiddleware');
const multer = require('multer');
const storageConfig = require('../middleware/multerMiddleware');

router.post('/', checkRole("ADMIN"), multer({storage: storageConfig}).single('img'), newsController.create);
router.get('/', newsController.getAll);
router.get('/:id', newsController.getOne);
router.get('/get/lastNew', newsController.getLastNew);

module.exports = router