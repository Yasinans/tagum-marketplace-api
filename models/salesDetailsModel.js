const db = require('../config/db');

const getSalesDetails = async () => {
    const [rows] = await db.query("SELECT Sales_ID, Bar_Code, Unit_Price, Quantity, Subtotal FROM salesdetails WHERE Status='Active'");
    return rows;
}

const getSalesDetailsBySalesId = async (salesId) => {
    const [rows] = await db.query("SELECT Sales_ID, Bar_Code, Unit_Price, Quantity, Subtotal FROM salesdetails WHERE Sales_ID = ? AND Status='Active'", [salesId]);
    return rows;
}

const getSalesDetailsByBarCode = async (barcode) => {
    const [rows] = await db.query("SELECT Sales_ID, Bar_Code, Unit_Price, Quantity, Subtotal FROM salesdetails WHERE Bar_Code = ? AND Status='Active'",[barcode]);
    return rows[0];
}

const getSalesDetailBySalesBarId = async (salesId, barcode) => {
    const [rows] = await db.query("SELECT Sales_ID, Bar_Code, Unit_Price, Quantity, Subtotal FROM salesdetails WHERE Sales_ID = ? AND Bar_Code = ? AND Status='Active'",[salesId, barcode]);
    return rows[0];
}

const deleteSalesDetailById = async (salesId, barcode) => {
    const [result] = await db.query("UPDATE salesdetails SET status = 'Deleted' WHERE Sales_ID = ? AND Bar_Code = ? AND status = 'Active'",[salesId, barcode]);
    //const [result] = await db.query("DELETE FROM salesdetails WHERE Sales_ID = ? AND Bar_Code = ?",[salesId, barcode]);
    return result.affectedRows > 0;
}
const addSalesDetail = async (salesId, barcode, unitPrice, quantity, subtotal) => {
    const [product] = await db.query("SELECT Inventory_Quantity FROM productvariant WHERE Bar_Code = ?", [barcode]);
    if (product[0].Inventory_Quantity < quantity) {
        throw new Error(`Not enough quantity for barcode ${barcode}. Available quantity is ${product[0].Inventory_Quantity}.`);
    }

    const [result] = await db.query("INSERT INTO salesdetails(Sales_ID, Bar_Code, Unit_Price, Quantity, Subtotal) VALUES(?,?,?,?,?)",[salesId, barcode, unitPrice, quantity, subtotal]);
    const newQuantity = product[0].Inventory_Quantity - quantity;
    await db.query("UPDATE productvariant SET Inventory_Quantity = ? WHERE Bar_Code = ?", [newQuantity, barcode]);

    return result.insertId;
}
const addMassSalesDetail = async (salesId, salesDetails) => {
    const products = await Promise.all(salesDetails.map(salesDetail => db.query("SELECT Inventory_Quantity FROM productvariant WHERE Bar_Code = ?", [salesDetail.barCode])));

    for (const [index, product] of products.entries()) {
        if (product[0].Inventory_Quantity < salesDetails[index].quantity) {
            throw new Error(`Not enough quantity for barcode ${salesDetails[index].barCode}. Available quantity is ${product[0].Inventory_Quantity}.`);
        }
    }
    const values = salesDetails.map(({ barCode, unitPrice, quantity }) => [salesId, barCode, unitPrice, quantity]);
    if (values.some(row => row.includes(undefined) || row.includes(null) || row.includes(NaN))) {
        throw new Error("Invalid data detected in salesDetails.");
    }
    const [result] = await db.query("INSERT INTO salesdetails (Sales_ID, Bar_Code, Unit_Price, Quantity) VALUES ?", [values]);
    for (const [index, product] of products.entries()) {
        const newQuantity = product[0][0].Inventory_Quantity - salesDetails[index].quantity;
        await db.query("UPDATE productvariant SET Inventory_Quantity = ? WHERE Bar_Code = ?", [newQuantity, salesDetails[index].barCode]);
    }
    return result.affectedRows === values.length;
}
module.exports = {
    getSalesDetails,
    getSalesDetailsBySalesId,
    getSalesDetailsByBarCode,
    getSalesDetailBySalesBarId,
  // editSalesDetailById,
    deleteSalesDetailById,
    addSalesDetail,
    addMassSalesDetail
};