const db = require('../config/db');

const getStockOuts = async () => {
    const [rows] = await db.query("SELECT * FROM stockoutsupply");
    return rows;
}

const getStockOutBySupplyDetailId = async (id) => {
    const [rows] = await db.query("SELECT * FROM stockoutsupply WHERE SupplyDetail_ID = ?", [id]);
    return rows[0];
}


const editStockOutById = async (id, supplydetail_id, employee_id, remarks_id) => {
    const [result] = await db.query("UPDATE stockoutsupply SET supplydetail_id = ?, employee_id = ?, remarks_id = ? WHERE StockOut_ID = ?", [supplydetail_id, employee_id, remarks_id, id]);
    return result.affectedRows > 0;
}

const deleteStockOutById = async (id) => {
    const [result] = await db.query("DELETE FROM stockoutsupply WHERE StockOut_ID = ?", [id]);
    return result.affectedRows > 0;
}

const addStockOut = async (supplydetail_id, employee_id, remarks_id) => {
    const [result] = await db.query("INSERT INTO stockoutsupply (supplydetail_id, employee_id, remarks_id) VALUES (?,?,?)", [supplydetail_id, employee_id, remarks_id]);
    return result.insertId;
}

module.exports = {
    getStockOuts,
    getStockOutBySupplyDetailId,
    editStockOutById,
    deleteStockOutById,
    addStockOut
};
