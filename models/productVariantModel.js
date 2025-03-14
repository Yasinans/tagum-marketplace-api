const db = require('../config/db');

const getProductVariants = async () => {
    const [rows] = await db.query(`
        SELECT p.Product_Name, pp.*
        FROM productvariant pp
        JOIN product p ON pp.Product_ID = p.Product_ID
    `);
    return rows;
}

const getProductVariantsByProductID = async (productId) => {
    const [rows] = await db.query(`
        SELECT p.Product_Name, pp.*
        FROM productvariant pp
        JOIN product p ON pp.Product_ID = p.Product_ID
        WHERE pp.Product_ID = ?
    `, [productId]);
    return rows;
}

const getProductVariantByBarCode = async (barCode) => {
    const [rows] = await db.query(`
        SELECT p.Product_Name, pp.*
        FROM productvariant pp
        JOIN product p ON pp.Product_ID = p.Product_ID
        WHERE pp.Bar_Code = ?
    `, [barCode]);
    return rows[0];
}

const editProductVariantByBarCode = async (barCode, newBarCode, productId, unitWeight, unitSize, unitPrice) => {
    const [result] = await db.query("UPDATE productvariant SET Bar_Code = ?, Product_ID = ?, Unit_Weight = ?, Unit_Size = ?, Unit_Price = ? WHERE Bar_Code = ?", [newBarCode, productId, unitWeight, unitSize, unitPrice, barCode]);
    return result.affectedRows > 0;
}

const deleteProductVariantByBarCode = async (barCode) => {
    const [result] = await db.query("DELETE FROM productvariant WHERE Bar_Code = ?",[barCode]);
    return result.affectedRows > 0;
}

const addProductVariant = async (barCode, productId, unitWeight, unitSize, unitPrice) => {
    const [result] = await db.query("INSERT INTO productvariant(bar_code, product_id, Unit_Weight, Unit_Size, Unit_Price) VALUES(?,?,?,?,?)",[barCode, productId, unitWeight, unitSize, unitPrice]);
    return result.insertId;
}

module.exports = {
    getProductVariants,
    getProductVariantsByProductID,
    getProductVariantByBarCode,
    editProductVariantByBarCode,
    deleteProductVariantByBarCode,
    addProductVariant
};