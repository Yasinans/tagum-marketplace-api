const express = require('express');
const router = express.Router();
const {getProductVariants,
    getProductVariantsByProductID,
    getProductVariantByBarCode,
    editProductVariantByBarCode,
    deleteProductVariantByBarCode,
    addProductVariant} 
    = require('../controllers/productVariantController.js');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

router.get('/', extractToken,verifyToken,checkPermissions,getProductVariants);
router.get('/product/:productId',extractToken,verifyToken,checkPermissions, getProductVariantsByProductID);

router.get('/:barCode',extractToken,verifyToken,checkPermissions, getProductVariantByBarCode);
router.put('/:barCode', extractToken,verifyToken,checkPermissions,editProductVariantByBarCode);
router.delete('/:barCode', extractToken,verifyToken,checkPermissions,deleteProductVariantByBarCode);

router.post('/', extractToken,verifyToken,checkPermissions,addProductVariant);

module.exports = router;
