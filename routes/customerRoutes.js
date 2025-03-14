const express = require('express');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const { getCustomers, getCustomerById, editCustomerById, deleteCustomerById, addCustomer } = require('../controllers/customerController');
const router = express.Router();

router.get('/', extractToken,verifyToken,checkPermissions,getCustomers);
router.post('/', extractToken,verifyToken,checkPermissions,addCustomer);

router.get('/:id',extractToken,verifyToken,checkPermissions, getCustomerById);
router.put('/:id',extractToken,verifyToken,checkPermissions, editCustomerById);
router.delete('/:id',extractToken,verifyToken,checkPermissions, deleteCustomerById);

module.exports = router;

