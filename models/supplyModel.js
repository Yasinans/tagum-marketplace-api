const db = require('../config/db');
const getSupply = async () => {
    const [rows] = await db.query(`SELECT s.Supply_ID, s.Supplier_id, s.Employee_id, S.Supply_date, 
    su.Supplier_Name, e.Employee_Name
    FROM supply s 
    INNER JOIN supplier su ON s.supplier_id = su.Supplier_ID 
    INNER JOIN employee e ON s.employee_id = e.Employee_ID WHERE s.status = 'Active' ORDER BY s.Supply_ID ASC`);
    return rows;
}

const getSupplyById = async (id) => {
    const [rows] = await db.query(`SELECT s.Supply_ID, s.Supplier_id, s.Employee_id, S.Supply_date, 
    su.Supplier_Name, e.Employee_Name
    FROM supply s 
    INNER JOIN supplier su ON s.supplier_id = su.Supplier_ID 
    INNER JOIN employee e ON s.employee_id = e.Employee_ID
    WHERE s.Supply_ID = ? AND s.status = 'Active'`, [id]);
    return rows[0];
}

const editSupplyById = async (id, supplier_id, employee_id, supply_date) => {
    const [result] = await db.query("UPDATE supply SET supplier_id = ?, employee_id = ?, supply_date = ? WHERE Supply_ID = ?", [supplier_id, employee_id, supply_date, id]);
    return result.affectedRows > 0;
}

const deleteSupplyById = async (id) => {
    const [result] = await db.query("UPDATE supply SET status = 'Deleted' WHERE Supply_ID = ? AND status = 'Active'", [id]);
    //const [result] = await db.query("DELETE FROM supply WHERE Supply_ID = ?", [id]);
    return result.affectedRows > 0;
}

const addSupply = async (supplier_id, employee_id, supply_date) => {
    const [result] = await db.query("INSERT INTO supply (supplier_id, employee_id, supply_date) VALUES (?, ?, ?)", [supplier_id, employee_id, supply_date]);
    return result.insertId;
}

module.exports = {
    getSupply,
    getSupplyById,
    editSupplyById,
    deleteSupplyById,
    addSupply
};
