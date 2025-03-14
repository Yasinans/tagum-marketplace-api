const express = require('express');
const router = express.Router();
const {getSalesDetails, getSalesDetailsBySalesId, getSalesDetailsByBarCode,getSalesDetailBySalesBarId, editSalesDetailById, deleteSalesDetailById, addSalesDetails} = require('../controllers/salesDetailsController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

router.get('/', extractToken,verifyToken,checkPermissions,getSalesDetails);
router.get('/sales/:salesId',extractToken,verifyToken,checkPermissions, getSalesDetailsBySalesId);
router.get('/barcode/:barCode',extractToken,verifyToken,checkPermissions, getSalesDetailsByBarCode);

router.get('/:salesId/:barCode',extractToken,verifyToken,checkPermissions, getSalesDetailBySalesBarId);
//router.put('/:salesId/:barCode', editSalesDetailById);
router.delete('/:salesId/:barCode',extractToken,verifyToken,checkPermissions, deleteSalesDetailById);

router.post('/:salesId',extractToken,verifyToken,checkPermissions, addSalesDetails);

module.exports = router;
