const customerModel = require('../models/customerModel');

const getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.getCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await customerModel.getCustomerById(id);
        if (!customer) return res.status(404).json({ message: "Customer not found." });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addCustomer = async (req, res) => {
    const { name, phone, address } = req.body;
    try {
        const customerId = await customerModel.addCustomer(name, phone, address);
        res.json({ message: "Customer added successfully." , customerId});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editCustomerById = async (req, res) => {
    const { name, phone, address } = req.body;
    const { id } = req.params;
    try {
        const customer = await customerModel.editCustomerById(id, name, phone, address);
        if (!customer) return res.status(404).json({ message: "Customer not found." });
        res.json({ message: "Customer updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customers = await customerModel.deleteCustomerById(id);
        if (!customers) return res.status(404).json({ message: "Customer not found." });
        res.json({ message: "Customer deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    editCustomerById,
    deleteCustomerById
};

