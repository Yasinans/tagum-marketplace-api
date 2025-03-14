const db = require('../config/db');

const getSales = async () => {
    const [rows] = await db.query(`
        SELECT s.Sales_ID, s.Customer_ID, s.Employee_ID, c.Customer_Name,e.Employee_Name, s.Sales_Date
        FROM sales s
        LEFT JOIN customer c ON s.Customer_ID = c.Customer_ID
        LEFT JOIN employee e ON s.Employee_ID = e.Employee_ID WHERE s.status = 'Active'
    `);
    return rows;
}

const getSaleById = async (id) => {
    const [rows] = await db.query(`
        SELECT s.Sales_ID, s.Customer_ID, s.Employee_ID, c.Customer_Name, e.Employee_Name, s.Sales_Date
        FROM sales s
        LEFT JOIN customer c ON s.Customer_ID = c.Customer_ID
        LEFT JOIN employee e ON s.Employee_ID = e.Employee_ID
        WHERE s.Sales_ID = ? AND s.status = 'Active'
    `,[id]);
    return rows[0];
}

const editSaleById = async (id, customerId, employeeId) => {
    const [result] = await db.query("UPDATE sales SET Customer_ID = ?, Employee_ID = ? WHERE Sales_ID = ?",[customerId, employeeId, id]);
    return result.affectedRows > 0;
}

const deleteSaleById = async (id) => {
    const [result] = await db.query("UPDATE sales SET status = 'Deleted' WHERE Sales_ID = ? AND status = 'Active'",[id]);

   // const [result] = await db.query("DELETE FROM sales WHERE Sales_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addSale = async (customerId, employeeId) => {
    const [result] = await db.query("INSERT INTO sales(Customer_ID, Employee_ID) VALUES(?,?)",[customerId, employeeId]);
    return result.insertId;
}

module.exports = {
    getSales,
    getSaleById,
    editSaleById,
    deleteSaleById,
    addSale
};