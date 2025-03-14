const productModel = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (!product) return res.status(404).json({ message: "Product not found." });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    const { name, brandId } = req.body;
    if (!brandId) return res.status(400).json({ message: "Brand ID is required." });
    try {
        const brandModel = require('../models/brandModel');
        const brandFound = await brandModel.getBrandById(brandId);
        if (!brandFound) return res.status(400).json({ message: "Brand ID does not exist." });
        const products = await productModel.getProducts();
        const productFound = products.find((product) => product.Product_Name.toLowerCase() === name.toLowerCase());
        if (productFound) return res.status(400).json({ message: "Product name must be unique." });
        const productId = await productModel.addProduct(name, brandId);
        res.json({ message: "Product added successfully.", productId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editProductById = async (req, res) => {
    const { id } = req.params;
    const { name, brandId } = req.body;
    if (!brandId) return res.status(400).json({ message: "Brand ID is required." });
    try {
        const brandModel = require('../models/brandModel');
        const brandFound = await brandModel.getBrandById(brandId);
        if (!brandFound) return res.status(400).json({ message: "Brand ID does not exist." });
        const productFound = await productModel.getProductById(id);
        if (!productFound) return res.status(404).json({ message: "Product not found." });
        const products = await productModel.getProducts();
        const productDuplicate = products.find((product) => product.Product_Name.toLowerCase() === name.toLowerCase() && product.Product_ID !== Number(id));
        if (productDuplicate) return res.status(400).json({ message: "Product name must be unique." });
        const success = await productModel.editProductById(id, name, brandId);
        if (!success) return res.status(400).json({ message: "Failed to update product." });
        res.json({ message: "Product updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await productModel.deleteProductById(id);
        if (!success) return res.status(404).json({ message: "Product not found." });
        res.json({ message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    editProductById,
    deleteProductById
};

