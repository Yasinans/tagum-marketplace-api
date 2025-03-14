const stockOutSupplyModel = require('../models/stockOutSupplyModel');

const getStockOuts = async (req, res) => {
    try {
        const stockOuts = await stockOutSupplyModel.getStockOuts();
        res.json(stockOuts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStockOutById = async (req, res) => {
    try {
        const { id } = req.params;
        const stockOut = await stockOutSupplyModel.getStockOutBySupplyDetailId(id);
        if (!stockOut) return res.status(404).json({ message: "StockOut not found." });
        res.json(stockOut);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addStockOut = async (req, res) => {
    try {
        const { supplyDetailId, remarksId } = req.body;
        const existingStockOut = await stockOutSupplyModel.getStockOutBySupplyDetailId(supplyDetailId);
        if (existingStockOut) return res.status(400).json({ message: "StockOut with the same SupplyDetail ID already exists." });
        const stockOutId = await stockOutSupplyModel.addStockOut(supplyDetailId, req.decodedToken.id, remarksId);
        res.json({ message: "StockOut added successfully.",stockOutId});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editStockOutById = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplyDetailId, remarksId } = req.body;
        const existingStockOut = await stockOutSupplyModel.getStockOutById(id);
        if (!existingStockOut) return res.status(404).json({ message: "StockOut not found." });
        const affectedRows = await stockOutSupplyModel.editStockOutById(id, supplyDetailId, req.decodedToken.id, remarksId);
        if (!affectedRows) return res.status(400).json({ message: "StockOut not updated." });
        res.json({ message: "StockOut updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStockOutById = async (req, res) => {
    try {
        const { id } = req.params;
        const existingStockOut = await stockOutSupplyModel.getStockOutById(id);
        if (!existingStockOut) return res.status(404).json({ message: "StockOut not found." });
        const affectedRows = await stockOutSupplyModel.deleteStockOutById(id);
        if (!affectedRows) return res.status(400).json({ message: "StockOut not deleted." });
        res.json({ message: "StockOut deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getStockOuts,
    getStockOutById,
    addStockOut,
    editStockOutById,
    deleteStockOutById
};
