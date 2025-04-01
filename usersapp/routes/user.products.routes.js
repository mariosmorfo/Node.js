const express = require('express');
const router = express.Router();

const userProductController = require('../controlles/user.product.controller')

router.get('/', userProductController.findAll)
router.get('/:username', userProductController.findOne)
router.post('/', userProductController.create)

module.exports = router;