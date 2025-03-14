const express = require('express');
const router = express.Router();
const { getStockOuts, getStockOutById, editStockOutById, deleteStockOutById, addStockOut } = require('../controllers/stockOutSupplyController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

router.get('/', extractToken,verifyToken,checkPermissions,getStockOuts);
router.post('/',extractToken,verifyToken,checkPermissions, addStockOut);

router.get('/:id',extractToken,verifyToken,checkPermissions, getStockOutById);
router.put('/:id',extractToken,verifyToken,checkPermissions, editStockOutById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteStockOutById);

module.exports = router;

