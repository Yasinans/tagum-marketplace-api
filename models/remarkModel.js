const db = require('../config/db');

const getRemarks = async () => {
    const [rows] = await db.query("SELECT * FROM remarks ORDER BY remarks_id ASC");
    return rows;
}

const getRemarkById = async (id) => {
    const [rows] = await db.query("SELECT * FROM remarks WHERE remarks_id = ?",[id]);
    return rows[0];
}

const editRemarkById = async (id, remarks) => {
    const [result] = await db.query("UPDATE remarks SET remarks = ? WHERE remarks_id = ?",[remarks,id]);
    return result.affectedRows > 0;
}

const deleteRemarkById = async (id) => {
    const [result] = await db.query("DELETE FROM remarks WHERE remarks_id = ?",[id]);
    return result.affectedRows > 0;
}

const addRemark = async (remarks) => {
    const [result] = await db.query("INSERT INTO remarks(remarks) VALUES(?)",[remarks]);
    return result.insertId;
}

module.exports = {
    getRemarks,
    getRemarkById,
    editRemarkById,
    deleteRemarkById,
    addRemark
};