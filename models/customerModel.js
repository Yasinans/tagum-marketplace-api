const db = require('../config/db');

const getCustomers = async () => {
    const [rows] = await db.query("SELECT * FROM customer");
    return rows;
}

const getCustomerById = async (id) => {
    const [rows] = await db.query("SELECT * FROM customer WHERE Customer_ID = ?",[id]);
    return rows[0];
}

const editCustomerById = async (id, name, phone, address) => {
    const [result] = await db.query("UPDATE customer SET Customer_Name = ?, Customer_PhoneNo = ?, Customer_Address = ? WHERE Customer_ID = ?",[name, phone, address, id]);
    return result.affectedRows > 0;
}

const deleteCustomerById = async (id) => {
    const [result] = await db.query("DELETE FROM customer WHERE Customer_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addCustomer = async (name, phone, address) => {
    const [result] = await db.query("INSERT INTO customer(Customer_Name, Customer_PhoneNo, Customer_Address) VALUES(?,?,?)",[name, phone, address]);
    return result.insertId;
}

module.exports = {
    getCustomers,
    getCustomerById,
    editCustomerById,
    deleteCustomerById,
    addCustomer
};