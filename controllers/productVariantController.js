const productVariantModel = require('../models/productVariantModel');

const getProductVariants = async (req, res) => {
    try {
        const productVariants = await productVariantModel.getProductVariants();
        res.json(productVariants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductVariantsByProductID = async (req, res) => {
    const { productId } = req.params;
    try {
        const productVariants = await productVariantModel.getProductVariantsByProductID(productId);
        res.json(productVariants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductVariantByBarCode = async (req, res) => {
    const { barCode } = req.params;
    try {
        const productVariant = await productVariantModel.getProductVariantByBarCode(barCode);
        if (!productVariant) return res.status(404).json({ message: "Product Variant not found." });
        res.json(productVariant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editProductVariantByBarCode = async (req, res) => {
    const { barCode } = req.params;
    const { newBarCode, productId, unitWeight, unitSize, unitPrice } = req.body;
    if (!newBarCode || !productId || !unitWeight || !unitSize || !unitPrice || newBarCode === "" || productId === "" || unitWeight === "" || unitSize === "" || unitPrice === "") {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const success = await productVariantModel.editProductVariantByBarCode(barCode, newBarCode, productId, unitWeight, unitSize, unitPrice);
        if (!success) return res.status(404).json({ message: "Product Variant not found." });
        res.json({ message: "Product Variant updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProductVariantByBarCode = async (req, res) => {
    const { barCode } = req.params;
    try {
        const success = await productVariantModel.deleteProductVariantByBarCode(barCode);
        if (!success) return res.status(404).json({ message: "Product Variant not found." });
        res.json({ message: "Product Variant deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProductVariant = async (req, res) => {
    const { newBarCode, productId, unitWeight, unitSize, unitPrice } = req.body;
    try {
        const productVariants = await productVariantModel.getProductVariants();
        const productVariantFound = productVariants.find((productVariant) => productVariant.Bar_Code === newBarCode);
        if (productVariantFound) return res.status(400).json({ message: "Bar Code must be unique." });
        const newProductVariantId = await productVariantModel.addProductVariant(newBarCode, productId, unitWeight, unitSize, unitPrice);
        res.json({ message: "Product Variant added successfully.", newProductVariantId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductVariants,
    getProductVariantsByProductID,
    getProductVariantByBarCode,
    editProductVariantByBarCode,
    deleteProductVariantByBarCode,
    addProductVariant
};

