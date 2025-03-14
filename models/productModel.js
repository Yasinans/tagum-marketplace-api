const db = require('../config/db');

const getProducts = async () => {
    const [rows] = await db.query(`
        SELECT p.Product_ID, p.Product_Name, p.Brand_ID, b.Brand_Name
        FROM product p
        INNER JOIN brand b ON p.brand_id = b.brand_id
    `);
    return rows;
}

const getProductById = async (id) => {
    const [rows] = await db.query(`
        SELECT p.Product_ID, p.Product_Name, p.Brand_ID, b.Brand_Name
        FROM product p
        INNER JOIN brand b ON p.brand_id = b.brand_id
        WHERE p.product_id = ?
    `,[id]);
    return rows[0];
}

const editProductById = async (id, productName, brandId) => {
    const [result] = await db.query("UPDATE product SET product_name = ?, brand_id = ? WHERE product_id = ?",[productName, brandId, id]);
    return result.affectedRows > 0;
}

const deleteProductById = async (id) => {
    const [result] = await db.query("DELETE FROM product WHERE product_id = ?",[id]);
    return result.affectedRows > 0;
}

const addProduct= async (name, brandId) => {
    const [result] = await db.query("INSERT INTO product(product_name, brand_id) VALUES(?,?)",[name, brandId]);
    return result.insertId;
}

module.exports = {
    getProducts,
    getProductById,
    editProductById,
    deleteProductById,
    addProduct
};