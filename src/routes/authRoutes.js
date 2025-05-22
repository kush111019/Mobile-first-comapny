const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register', authController.register);
router.post('/login', authController.login);



module.exports = router;
