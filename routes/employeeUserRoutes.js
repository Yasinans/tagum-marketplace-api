const express = require('express');
const {
    getEmployeeUsers,
    getEmployeeUserById,
    editEmployeeUser,
    deleteEmployeeUser,
    addEmployeeUser
} = require('../controllers/employeeUserController');
const { checkPermissions,verifyToken,extractToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/',extractToken,verifyToken,checkPermissions,getEmployeeUsers);
router.post('/',extractToken,verifyToken,checkPermissions,addEmployeeUser);

router.get('/:employeeId',extractToken,verifyToken,checkPermissions,getEmployeeUserById);
router.put('/:employeeId',extractToken,verifyToken,checkPermissions,editEmployeeUser);
router.delete('/:employeeId',extractToken,verifyToken,checkPermissions,deleteEmployeeUser);

module.exports = router;