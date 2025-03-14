const supplyModel = require('../models/supplyModel');

const getSupplies = async (req, res) => {
    try {
        const supplies = await supplyModel.getSupply();
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addSupply = async (req, res) => {
    try {
        const { supplierId, supplyDate } = req.body;

        const supplyId = await supplyModel.addSupply(supplierId, req.decodedToken.id, supplyDate);
        res.json({ message: "Supply added successfully.", supplyId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSupplyById = async (req, res) => {
    try {
        const { id } = req.params;
        const supply = await supplyModel.getSupplyById(id);
        if (!supply) return res.status(404).json({ message: "Supply not found." });
        res.json(supply);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editSupplyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplierId, supplyDate } = req.body;
        if (!supplierId || !supplyDate) return res.status(400).json({ message: "All fields are required." });
        const supplyExists = await supplyModel.getSupplyById(id);
        if (!supplyExists) return res.status(404).json({ message: "Supply not found." });

        const updated = await supplyModel.editSupplyById(id, supplierId, req.decodedToken.id, supplyDate);
        if (!updated) return res.status(400).json({ message: "Supply not updated." });

        res.json({ message: "Supply updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSupplyById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await supplyModel.deleteSupplyById(id);
        if (!deleted) return res.status(404).json({ message: "Supply not found." });
        res.json({ message: "Supply deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSupplies,
    addSupply,
    getSupplyById,
    editSupplyById,
    deleteSupplyById
};

