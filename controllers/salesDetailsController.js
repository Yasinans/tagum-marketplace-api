const salesDetailsModel = require('../models/salesDetailsModel');
const salesModel = require('../models/salesModel');
const getSalesDetails = async (req, res) => {
    try {
        const salesDetails = await salesDetailsModel.getSalesDetails();
        res.json(salesDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesDetailsBySalesId = async (req, res) => {
    try {
        const salesId = req.params.salesId;
        const salesDetails = await salesDetailsModel.getSalesDetailsBySalesId(salesId);
        res.json(salesDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesDetailsByBarCode = async (req, res) => {
    try {
        const barCode = req.params.barCode;
        const salesDetails = await salesDetailsModel.getSalesDetailsByBarCode(barCode);
        res.json(salesDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesDetailBySalesBarId = async (req, res) => {
    try {
        const salesId = req.params.salesId;
        const barCode = req.params.barCode;
        const salesDetail = await salesDetailsModel.getSalesDetailBySalesBarId(salesId, barCode);
        res.json(salesDetail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSalesDetailById = async (req, res) => {
    try {
        const salesId = req.params.salesId;
        const barCode = req.params.barCode;
        const result = await salesDetailsModel.deleteSalesDetailById(salesId, barCode);
        res.json({ message: "Sales Detail deleted successfully."});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addSalesDetails = async (req, res) => {
    try {
        const {salesId} = req.params;
        const salesDetails = req.body;

        if (salesDetails.length === 0) return res.status(400).json({ message: "There must be at least 1 Sales Detail." });
        const salesFound = await salesModel.getSaleById(salesId);
        if (!salesFound) return res.status(404).json({ message: "Sales ID does not exist." });
        const existingBarcodes = await salesDetailsModel.getSalesDetailsBySalesId(salesId);
        const existingBarcodesList = existingBarcodes.map(item => item.Bar_Code);
        const newBarcodes = salesDetails.map(item => item.Bar_Code);
        const duplicateBarcodes = newBarcodes.filter(item => existingBarcodesList.includes(item));
        if (duplicateBarcodes.length > 0) return res.status(400).json({ message: `The following barcodes already exist in the Sales ID ${salesId}: ${duplicateBarcodes.join(", ")}.` });
        const invalidQuantities = salesDetails.filter(item => item.quantity <= 0);
        if (invalidQuantities.length > 0) return res.status(400).json({ message: `The following barcodes have invalid quantities: ${invalidQuantities.map(item => item.Bar_Code).join(", ")}.` });
        const results = await salesDetailsModel.addMassSalesDetail(salesId, salesDetails);
        return res.json({ message: "Sales Details added successfully."});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getSalesDetails,
    getSalesDetailsBySalesId,
    getSalesDetailsByBarCode,
    getSalesDetailBySalesBarId,
   // editSalesDetailById,
    deleteSalesDetailById,
    addSalesDetails
};
