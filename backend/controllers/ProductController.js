// Import necessary modules
const express = require("express");
const router = express.Router();
const ProductService = require("../services/ProductService.js");
const verifyToken = require("../config/verifyToken.js");
const allowCors = require("../middleware/corsMiddleware"); // Adjust the path accordingly

// Wrap each route handler with allowCors

router.get(
  "/FetchShoe",
  allowCors(async (req, res) => {
    const query = req.query; // Get query params from request
    if (
      !query.brand &&
      !query.size &&
      !query.name &&
      !query.colour &&
      !query.gender &&
      !query.stock &&
      !query.price &&
      !query.rating &&
      !query.category
    ) {
      const shoes = await ProductService.fetchAllShoes();
      res.status(200).json(shoes);
      return;
    }

    try {
      const shoes = await ProductService.fetchShoes(query); // Forward query params to Product Service
      res.status(200).json(shoes);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  })
);

router.get(
  "/FetchAll",
  allowCors(async (req, res) => {
    try {
      const shoes = await ProductService.fetchAllShoes();
      res.status(200).json(shoes);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  })
);

router.get(
  "/FetchShoeById",
  allowCors(async (req, res) => {
    const { product_id } = req.query;

    if (!product_id) {
      res.status(400).json({ message: "No product_id associated with query" });
      return;
    }

    try {
      const shoe = await ProductService.fetchShoeById(product_id);
      res.status(200).json(shoe);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  })
);

router.post(
  "/UpdateStock",
  verifyToken,
  allowCors(async (req, res) => {
    const isAdmin = req.user.userData[7];

    if (!isAdmin) {
      res.status(401).json({ message: "You don't have access" });
      return;
    }

    const { product_id, stock } = req.body;

    if (!product_id) {
      res
        .status(400)
        .json({ message: "No product_id for updating stock of shoe" });
      return;
    }

    try {
      if (await ProductService.updateStock({ product_id, stock })) {
        res.status(201).json({ message: "Stock successfully updated" });
      } else {
        res.status(408).json({ message: "Stock not updated" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  })
);

module.exports = router;
