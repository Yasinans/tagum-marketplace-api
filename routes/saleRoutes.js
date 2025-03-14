const express = require('express');
const router = express.Router();
const { getSales, getSaleById, editSaleById, deleteSaleById, addSale } = require('../controllers/salesController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

router.get('/', extractToken,verifyToken,checkPermissions,getSales);
router.post('/',extractToken,verifyToken,checkPermissions, addSale);

router.get('/:id', extractToken,verifyToken,checkPermissions,getSaleById);
//router.put('/:id', editSaleById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteSaleById);


module.exports = router;

