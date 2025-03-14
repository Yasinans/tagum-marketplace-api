const express = require('express');
const { getRemarks, getRemarkById, editRemarkById, deleteRemarkById, addRemark } = require('../controllers/remarkController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', extractToken,verifyToken,checkPermissions,getRemarks);
router.post('/', extractToken,verifyToken,checkPermissions,addRemark);

router.get('/:id', extractToken,verifyToken,checkPermissions,getRemarkById);
router.put('/:id', extractToken,verifyToken,checkPermissions,editRemarkById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteRemarkById);

module.exports = router;

