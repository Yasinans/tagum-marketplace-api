const remarkModel = require('../models/remarkModel');

const getRemarks = async (req, res) => {
    try {
        const remarks = await remarkModel.getRemarks();
        res.json(remarks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getRemarkById = async (req, res) => {
    try {
        const remark = await remarkModel.getRemarkById(req.params.id);
        if (!remark) return res.status(404).json({ message: "Remark not found" });
        res.json(remark);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editRemarkById = async (req, res) => {
    try {
        const remark = await remarkModel.getRemarkById(req.params.id);
        if (!remark) return res.status(404).json({ message: "Remark not found" });
        if (!req.body.remark) return res.status(400).json({ message: "All field is required" });

        const isUpdated = await remarkModel.editRemarkById(req.params.id, req.body.remark);
        if (!isUpdated) return res.status(404).json({ message: "Remark not found" });
        res.json({ message: "Remark updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteRemarkById = async (req, res) => {
    try {
        const isDeleted = await remarkModel.deleteRemarkById(req.params.id);
        if (!isDeleted) return res.status(404).json({ message: "Remark not found" });
        res.json({ message: "Remark deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const addRemark = async (req, res) => {
    try {
        if (!req.body.remark) return res.status(400).json({ message: "All field is required" });
        const newRemark = await remarkModel.addRemark(req.body.remark);
        res.json({ message: "Remark added successfully", remark: newRemark });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getRemarks,
    getRemarkById,
    editRemarkById,
    deleteRemarkById,
    addRemark
};
