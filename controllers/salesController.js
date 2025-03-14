const salesModel = require('../models/salesModel');

const getSales = async (req, res) => {
    try {
        const sales = await salesModel.getSales();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSaleById = async (req, res) => {
    try {
        const sale = await salesModel.getSaleById(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found." });
        res.json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addSale = async (req, res) => {
    const { customerId} = req.body;
    if (!customerId) return res.status(400).json({ message: "Customer ID is required." });
    try {
        const saleId = await salesModel.addSale(customerId, req.decodedToken.id);
        res.json({ message: "Sale added successfully.", saleId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editSaleById = async (req, res) => {
    try {
        const { customerId } = req.body;
        const updated = await salesModel.editSaleById(req.params.id, customerId, req.decodedToken.id);
        if (!updated) return res.status(404).json({ message: "Sale not found." });
        res.json({ message: "Sale updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSaleById = async (req, res) => {
    try {
        const deleted = await salesModel.deleteSaleById(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Sale not found." });
        res.json({ message: "Sale deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSales,
    getSaleById,
    addSale,
    editSaleById,
    deleteSaleById
};

