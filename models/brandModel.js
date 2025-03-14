const db = require('../config/db');

const getBrands = async () => {
    const [rows] = await db.query("SELECT * FROM brand ORDER BY brand_id ASC");
    return rows;
}

const getBrandById = async (id) => {
    const [rows] = await db.query("SELECT * FROM brand WHERE brand_id = ?",[id]);
    return rows[0];
}

const editBrandById = async (id, name) => {
    const [result] = await db.query("UPDATE brand SET brand_name = ? WHERE brand_id = ?",[name,id]);
    return result.affectedRows > 0;
}

const deleteBrandById = async (id) => {
    const [result] = await db.query("DELETE FROM brand WHERE brand_id = ?",[id]);
    return result.affectedRows > 0;
}

const addBrand = async (name) => {
    const [result] = await db.query("INSERT INTO brand(brand_name) VALUES(?)",[name]);
    return result.insertId;
}

module.exports = {
    getBrands,
    getBrandById,
    editBrandById,
    deleteBrandById,
    addBrand
};