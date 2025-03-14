const employeeUserModel = require('../models/employeeUserModel');

const getEmployeeUsers = async (req, res) => {
    try {
        const employeeUsers = await employeeUserModel.getEmployeeUsers();
        res.json(employeeUsers);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getEmployeeUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const employeeUser = await employeeUserModel.getEmployeeUserById(id);
        if(!employeeUser) return res.status(404).json({message: "Data not found." });
        res.json(employeeUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editEmployeeUser = async (req, res) => {
    const {employeeId} = req.params;
    const {employeeName, employeeDOB, employeeGender, 
        employeeAddress, employeeContactNo, username, password, role} = req.body;
    if (!employeeName || !employeeDOB || !employeeGender ||
        !employeeAddress || !employeeContactNo || !username || !role) {
        return res.status(400).json({message: "All fields are required." });
    }
    if (!['Male', 'Female', 'Others'].includes(employeeGender)) {
        return res.status(400).json({message: "Invalid gender." });
    }
    
    try {
        const isUpdated = await employeeUserModel.editEmployeeUser(employeeId, employeeName, employeeDOB, employeeGender, 
            employeeAddress, employeeContactNo, username, password, role);
        if(!isUpdated) return res.status(404).json({message: "Data not found." });
        res.json({message: "Data updated successfully." });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const deleteEmployeeUser = async (req, res) => {
    const {employeeId} = req.params;
    try {
        const isDeleted = await employeeUserModel.deleteEmployeeUser(employeeId);
        if(!isDeleted) return res.status(404).json({message: "Data not found." });
        res.json({message: "Data deleted successfully." });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const addEmployeeUser = async (req, res) => {
    const {employeeName, employeeDOB, employeeGender, 
        employeeAddress, employeeContactNo, username, password, role} = req.body;
        if (!employeeName || !employeeDOB || !employeeGender ||
            !employeeAddress || !employeeContactNo || !username || !role || !password) {
            return res.status(400).json({message: "All fields are required." });
        }
    if (!['Male', 'Female', 'Others'].includes(employeeGender)) {
        return res.status(400).json({message: "Invalid gender." });
    }
    try {
        const id = await employeeUserModel.addEmployeeUser(employeeName, employeeDOB, employeeGender, 
            employeeAddress, employeeContactNo, username, password, role);
        res.json({message: "Data added successfully", id});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getEmployeeUsers,
    getEmployeeUserById,
    editEmployeeUser,
    deleteEmployeeUser,
    addEmployeeUser
};
