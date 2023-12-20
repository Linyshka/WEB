const Router = require('express');
const router = new Router();
const serviceController = require('../controllers/serviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole("ADMIN"), serviceController.create);
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.delete('/:id', checkRole("ADMIN"), serviceController.deleteOne);
router.put('/:id', checkRole("ADMIN"), serviceController.updateOne);

module.exports = router