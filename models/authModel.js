const db = require('../config/db');

const getUserByUsername = async (username) => {
    const [rows] = await db.query("SELECT * FROM users where Username = ?", [username]);
    return rows[0];
}

const getUserById = async (id) => {
    const [rows] = await db.query("SELECT Employee_ID, Username, Role, User_DateReg FROM users where Employee_ID = ?", [id]);
    return rows[0];
}

const updateUser = async (employeeId, username, password) => {
    if(username !== (await getUserById(employeeId)).Username) {
        const [rows] = await db.query("SELECT * FROM users WHERE Username = ?", [username]);
        if(rows.length > 0) throw new Error("Username already exists.");
    }
    const [user] = await db.query("UPDATE users SET Username = ?, Password = ? WHERE Employee_ID = ?", [username, password, employeeId]);
    return user.affectedRows > 0;
}


module.exports= {getUserByUsername, getUserById, updateUser};