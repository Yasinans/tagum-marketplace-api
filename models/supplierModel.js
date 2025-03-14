const db = require('../config/db');

const getSuppliers = async () => {
    const [rows] = await db.query("SELECT * FROM supplier");
    return rows;
}

const getSupplierById = async (id) => {
    const [rows] = await db.query("SELECT * FROM supplier WHERE Supplier_ID = ?", [id]);
    return rows[0];
}

const editSupplierById = async (id, name, email, address, contactNo) => {
    const [result] = await db.query("UPDATE supplier SET Supplier_Name = ?, Supplier_Email = ?, Supplier_Address = ?, Supplier_ContactNo = ? WHERE Supplier_ID = ?", [name, email, address, contactNo, id]);
    return result.affectedRows > 0;
}

const deleteSupplierById = async (id) => {
    const [result] = await db.query("DELETE FROM supplier WHERE Supplier_ID = ?", [id]);
    return result.affectedRows > 0;
}

const addSupplier = async (name, email, address, contactNo) => {
    const [result] = await db.query("INSERT INTO supplier (Supplier_Name, Supplier_Email, Supplier_Address, Supplier_ContactNo) VALUES (?, ?, ?, ?)", [name, email, address, contactNo]);
    return result.insertId;
}

module.exports = {
    getSuppliers,
    getSupplierById,
    editSupplierById,
    deleteSupplierById,
    addSupplier
};
