const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);
router.post('/place', orderController.placeOrder);
router.get('/', orderController.getOrders);

module.exports = router;
