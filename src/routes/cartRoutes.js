const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);
router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);

module.exports = router;
