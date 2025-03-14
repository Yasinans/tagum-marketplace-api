const express = require('express');
const { getSupplyDetails, getSupplyDetailById, getSupplyDetailsByBarCode, getSupplyDetailsBySupplyId, addSupplyDetail, editSupplyDetailById, deleteSupplyDetailById } = require('../controllers/supplyDetailsController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', extractToken,verifyToken,checkPermissions,getSupplyDetails);
router.get('/supply/:supplyId',extractToken,verifyToken,checkPermissions, getSupplyDetailsBySupplyId);
router.get('/barcode/:barCode', extractToken,verifyToken,checkPermissions,getSupplyDetailsByBarCode);
router.get('/:id', extractToken,verifyToken,checkPermissions,getSupplyDetailById);

router.post('/', extractToken,verifyToken,checkPermissions,addSupplyDetail);

router.put('/:supplyDetailId',extractToken,verifyToken,checkPermissions, editSupplyDetailById);
router.delete('/:supplyDetailId',extractToken,verifyToken,checkPermissions, deleteSupplyDetailById);

module.exports = router;

