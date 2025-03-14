const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getEmployeeUsers = async () => {
    const [rows] = await db.query(`SELECT 
        e.Employee_ID, e.Employee_Name, e.Employee_DOB, 
        e.Employee_Gender, e.Employee_Address,e.Employee_ContactNo,
        u.Username, u.Role, u.User_DateReg
        FROM users u
        JOIN employee e ON u.Employee_ID = e.Employee_ID`);
    return rows;
}

const getEmployeeUserById = async (id) => {
    const [rows] = await db.query(`SELECT 
        e.Employee_ID, e.Employee_Name, e.Employee_DOB, 
        e.Employee_Gender, e.Employee_Address,e.Employee_ContactNo,
        u.Username, u.Role, u.User_DateReg
        FROM users u
        JOIN employee e ON u.Employee_ID = e.Employee_ID
        WHERE u.Employee_ID = ?`, [id]);
    return rows[0];
}
const addEmployeeUser = async(employeeName, employeeDOB, employeeGender, 
    employeeAddress, employeeContactNo, username, password, role) => {
    /*
    1. Check if Username already exists
    2. Create Employee and Get Employee ID
    3. Create User
    */
    const [rows] = await db.query("SELECT * FROM users WHERE Username = ?", [username]);
    if(rows.length > 0) throw new Error("Username already exists.");
        
    const hashedPassword = await bcrypt.hash(password, 10);

    const [employee] = await db.query(
        `INSERT INTO employee(Employee_Name, Employee_DOB, 
        Employee_Gender, Employee_Address, Employee_ContactNo) VALUES(?,?,?,?,?)`,
    [employeeName, employeeDOB, employeeGender, employeeAddress, employeeContactNo]);
    const employeeId = employee.insertId;

    const [user] = await db.query(
        `INSERT INTO users(Employee_ID, Username, Password, Role) VALUES(?,?,?,?)`,
    [employeeId, username, hashedPassword, role]);
    return user.insertId;
}

const editEmployeeUser = async(employeeId, employeeName, employeeDOB, employeeGender, 
    employeeAddress, employeeContactNo, username, password, role) => {
    let query;
    if(username !== (await getEmployeeUserById(employeeId)).Username) {
        const [rows] = await db.query("SELECT * FROM users WHERE Username = ?", [username]);
        if(rows.length > 0) throw new Error("Username already exists.");
    }
    let hashedPassword;
    if(password !== '') {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    const [employee] = await db.query(
        `UPDATE employee SET Employee_Name = ?, Employee_DOB = ?, 
        Employee_Gender = ?, Employee_Address = ?, Employee_ContactNo = ? WHERE Employee_ID = ?`,
    [employeeName, employeeDOB, employeeGender, employeeAddress, employeeContactNo, employeeId]);
    if(password === '') {
        query = `UPDATE users SET Username = ?, Role = ? WHERE Employee_ID = ?`;
        const [user] = await db.query(query, [username, role, employeeId]);
        return user.affectedRows > 0;;
    }
    query = `UPDATE users SET Username = ?, Password = ?, Role = ? WHERE Employee_ID = ?`;
    const [user] = await db.query(query, [username, hashedPassword, role, employeeId]);
    return user.affectedRows > 0;
}

const deleteEmployeeUser = async(employeeId) => {
    const [rows] = await db.query("DELETE FROM employee WHERE Employee_ID = ?", [employeeId]);
    return rows.affectedRows > 0;
}

module.exports = {
    getEmployeeUsers,
    getEmployeeUserById,
    addEmployeeUser,
    editEmployeeUser,
    deleteEmployeeUser
}