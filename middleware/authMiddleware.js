const jwt = require("jsonwebtoken");
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
  } else {
    req.token = null;
  }

  next();
};

const verifyToken = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(req.token, config.jwt.secret);
    req.decodedToken = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const checkPermissions = (req, res, next) => {
  const permissions = {
    admin: {
      analytics: ["get"],
      brand: ["get", "post", "put", "delete"],
      customer: ["get", "post", "put", "delete"],
      employee: ["get", "post", "put", "delete"],
      productVariant: ["get", "post", "put", "delete"],
      product: ["get", "post", "put", "delete"],
      remark: ["get", "post", "put", "delete"],
      saleDetail: ["get", "post", "put", "delete"],
      sale: ["get", "post", "put", "delete"],
      stockOut: ["get", "post", "put", "delete"],
      supply: ["get", "post", "put", "delete"],
      supplyDetail: ["get", "post", "put", "delete"],
      supplier: ["get", "post", "put", "delete"],
      user: ["get", "post", "put", "delete"],
    },
    cashier: {
      analytics: ["get"],
      sale: ["get", "post", "put", "delete"],
      saleDetail: ["get", "post", "put", "delete"],
      customer: ["get", "post", "put", "delete"],
      productVariant:["get"]
    },
    stockman: {
      analytics: ["get"],
      brand: ["get", "post", "put", "delete"],
      productVariant: ["get", "post", "put", "delete"],
      remark: ["get", "put"],
      stockOut: ["get", "post", "put", "delete"],
      supply: ["get", "post", "put", "delete"],
      supplyDetail: ["get", "post", "put", "delete"],
      supplier: ["get", "post", "put", "delete"],
      product: ["get", "post", "put", "delete"],
    },
  };
  if (
    permissions[req.decodedToken.role][req.baseUrl.split("/")[2]]?.includes(
      req.method.toLowerCase()
    )
  ) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  }
};
module.exports = { extractToken, verifyToken, checkPermissions };
