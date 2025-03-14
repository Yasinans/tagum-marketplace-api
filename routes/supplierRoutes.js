const express = require('express');
const {getSuppliers, getSupplierById, editSupplierById, deleteSupplierById, addSupplier} = require('../controllers/supplierController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', extractToken,verifyToken,checkPermissions,getSuppliers);
router.post('/',extractToken,verifyToken,checkPermissions, addSupplier);

router.get('/:id',extractToken,verifyToken,checkPermissions, getSupplierById);
router.put('/:id',extractToken,verifyToken,checkPermissions, editSupplierById);
router.delete('/:id', extractToken,verifyToken,checkPermissions,deleteSupplierById);

module.exports = router;
