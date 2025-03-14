const express = require('express');
const { getSupplies, getSupplyById, editSupplyById, deleteSupplyById, addSupply } = require('../controllers/supplyController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', extractToken,verifyToken,checkPermissions,getSupplies);
router.post('/',extractToken,verifyToken,checkPermissions, addSupply);

router.get('/:id', extractToken,verifyToken,checkPermissions,getSupplyById);
router.put('/:id',extractToken,verifyToken,checkPermissions, editSupplyById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteSupplyById);

module.exports = router;
