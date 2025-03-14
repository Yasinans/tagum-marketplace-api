const express = require('express');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const {getAllBrands,getBrandById,editBrandById,addBrand, deleteBrandById} = require('../controllers/brandController');
const router = express.Router();

router.get('/',extractToken,verifyToken,checkPermissions,getAllBrands);
router.post('/',extractToken,verifyToken,checkPermissions,addBrand);

router.get('/:id',extractToken,verifyToken,checkPermissions,getBrandById);
router.put('/:id',extractToken,verifyToken,checkPermissions,editBrandById);
router.delete('/:id',extractToken,verifyToken,checkPermissions,deleteBrandById);

module.exports = router;