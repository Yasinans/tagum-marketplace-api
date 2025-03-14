const supplierModel = require('../models/supplierModel');

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getSuppliers();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const supplier = await supplierModel.getSupplierById(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found." });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editSupplierById = async (req, res) => {
    const {id} = req.params;
    const {name, email, address, contactno} = req.body;
    try {
        const supplierFound = await supplierModel.getSupplierById(req.params.id);
        if (!supplierFound) return res.status(404).json({ message: "Supplier not found." });
        const edited = await supplierModel.editSupplierById(id, name, email, address, contactno);
        res.json({ message: "Supplier edited successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSupplierById = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await supplierModel.deleteSupplierById(id);
        if (!deleted) return res.status(400).json({ message: "Supplier not found." });
        res.json({ message: "Supplier deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addSupplier = async (req, res) => {
    try {
        const {name, email, address, contactno} = req.body;
        const added = await supplierModel.addSupplier(name, email, address, contactno);
        res.json({ message: "Supplier added successfully."});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSuppliers,
    getSupplierById,
    editSupplierById,
    deleteSupplierById,
    addSupplier
};
