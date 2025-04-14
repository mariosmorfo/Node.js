const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles

router.get('/', verifyToken ,userController.findAll);
router.get('/:username', verifyToken, userController.findOne)
router.post('/', verifyToken, verifyRoles("ADMIN"), userController.create)
// router.post('/', userController.create)
router.patch('/:username', verifyToken, userController.update)
router.delete('/:username', verifyToken, userController.deleteByUsername)
router.delete('/:username/email/:email', verifyToken, userController.deleteByEmail)

module.exports = router;