const express = require('express');
const router = express.Router();
const {getProducts, getProductById, editProductById, deleteProductById, addProduct} = require('../controllers/productController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

router.get('/', extractToken,verifyToken,checkPermissions,getProducts);
router.post('/',extractToken,verifyToken,checkPermissions, addProduct);

router.get('/:id',extractToken,verifyToken,checkPermissions, getProductById);
router.put('/:id',extractToken,verifyToken,checkPermissions, editProductById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteProductById);

module.exports = router;
