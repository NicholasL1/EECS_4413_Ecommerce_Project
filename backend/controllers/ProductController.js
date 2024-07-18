const express = require("express");
const router = express.Router();

const ProductService = require("../services/ProductService.js");


router.get("/fetchShoe", async (req, res) => {
    const query = req.query;                            // Get query params from request

    if (!query.brand && !query.size && !query.name && !query.colour && !query.gender && !query.stock && !query.price && !query.rating && !query.category) {
        res.status(400);
        res.send("No parameters associated with query");
        throw new Error("No parameters associated with query");
    }

    try {
        const shoes = await ProductService.fetchShoes(query);       // Forward query params to Product Service
        res.status(200).json(shoes);
    } catch (error) {
        throw new Error(error);
    }

});


router.get("/fetchAll", async (req, res) => {

    try {
        const shoes = await ProductService.fetchAllShoes();
        res.status(200).json(shoes);
    } catch (error) {
        throw new Error(error);
    }

});


router.post("/updateStock", async (req, res) => {

    const {name, size, colour, stock} = req.body;               // All fields required for updating the stock of a shoe in the DB (am I missing any?)

    if (!name || !size || !colour || !stock) {
        res.status(400);
        throw new Error("Insufficient info for updating stock of shoe");
    }

    try {
        if (await ProductService.updateStock({name, size, colour, stock})) {            // Not sure if we want/need a return json from updating, just a boolean on whether or not it succeeded in the DB
            res.status(201);
            res.send("Stock successfully updated");        
        } else {
            res.status(408);                        // Is request timeout the right status for this situation?
            res.send("Stock not updated");
        }
    } catch (error) {
        throw new Error(error);
    }

});

module.exports = router;