const brandModel = require('../models/brandModel');

const getAllBrands = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();
        res.json(brands);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getBrandById = async (req, res) => {
    const {id} = req.params;
    try {
        const brand = await brandModel.getBrandById(id);
        if(!brand) return res.status(404).json({message: "Brand not found." });
        res.json(brand);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editBrandById = async (req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    try {
        const brand = await brandModel.editBrandById(id, name);
        if(!brand) return res.status(404).json({message: "Brand not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteBrandById = async (req, res) => {
    const {id} = req.params;
    try {
        const brand = await brandModel.deleteBrandById(id);
        if(!brand) return res.status(404).json({message: "Brand not found." });
        res.json({message:"Brand deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addBrand = async (req, res) => {
    const {name} = req.body;
    try {
        const brands = await brandModel.getBrands();
        const brandFound = brands.find((brand) => brand.Brand_Name === name);
        if (brandFound) return res.status(400).json({ message: "Brand name must be unique." });
        const brand = await brandModel.addBrand(name);
        res.json({message:"Brand added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllBrands, getBrandById, editBrandById, addBrand,deleteBrandById};