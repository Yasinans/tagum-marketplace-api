const supplyDetailsModel = require('../models/supplyDetailsModel');

const getSupplyDetails = async (req, res) => {
    try {
        const supplyDetails = await supplyDetailsModel.getSupplyDetails();
        res.json(supplyDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSupplyDetailsBySupplyId = async (req, res) => {
    const { supplyId } = req.params;
    try {
        const supplyDetails = await supplyDetailsModel.getSupplyDetailsBySupplyId(supplyId);
        res.json(supplyDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSupplyDetailsByBarCode = async (req, res) => {
    const { barCode } = req.params;
    try {
        const supplyDetails = await supplyDetailsModel.getSupplyDetailsByBarCode(barCode);
        res.json(supplyDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSupplyDetailById = async (req, res) => {
    const { supplyDetailId } = req.params;
    try {
        const supplyDetail = await supplyDetailsModel.getSupplyDetailById(supplyDetailId);
        if (!supplyDetail) return res.status(404).json({ message: "Supply detail not found." });
        res.json(supplyDetail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editSupplyDetailById = async (req, res) => {
    const { supplyDetailId } = req.params;
    const { quantity, unitPrice, expiry } = req.body;
    try {
        const success = await supplyDetailsModel.editSupplyDetailById(supplyDetailId, quantity, unitPrice, expiry);
        if (!success) return res.status(400).json({ message: "Failed to update supply detail." });
        res.json({ message: "Supply detail updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSupplyDetailById = async (req, res) => {
    const { supplyDetailId } = req.params;
    try {
        const success = await supplyDetailsModel.deleteSupplyDetailById(supplyDetailId);
        if (!success) return res.status(400).json({ message: "Failed to delete supply detail." });
        res.json({ message: "Supply detail deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addSupplyDetail = async (req, res) => {
    const { supplyId, barCode, quantity, unitPrice, expiry } = req.body;
    try {
        const success = await supplyDetailsModel.addSupplyDetail(supplyId, barCode, quantity, unitPrice, expiry);
        if (!success) return res.status(400).json({ message: "Failed to add supply detail." });
        res.json({ message: "Supply detail added successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSupplyDetails,
    getSupplyDetailsBySupplyId,
    getSupplyDetailsByBarCode,
    getSupplyDetailById,
    editSupplyDetailById,
    deleteSupplyDetailById,
    addSupplyDetail
};
