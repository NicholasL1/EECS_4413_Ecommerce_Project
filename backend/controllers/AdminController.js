const express = require("express");
const router = express.Router();
const verifyAdmin = require("../config/verifyAdmin.js");
const AdminService = require("../services/AdminService.js");
const { generateToken } = require("../config/generateToken.js");
const verifyToken = require("../config/verifyToken.js");

router.post("/AddProduct", verifyToken, verifyAdmin, async (req, res) => {
  const { brand, size, name, colour, gender, stock, price, rating, category } =
    req.body;

  if (!brand || !size || !name || !colour || !stock || !price || !gender) {
    res.status(400).json({
      message:
        "Please enter at least the brand, size, name, colour, stock, gender, and price of the product you want to add",
    });
    return
  }

  try {
    if (
      await AdminService.addShoe({
        brand,
        size,
        name,
        colour,
        gender,
        stock,
        price,
        rating,
        category,
        image
      })
    ) {
      res.status(201).json({ messsage: "Shoe successfully added" });
    } else {
      res.status(408).json({ messsage: "Shoe not successfully added" });
    }
  } catch (error) {
    res.send({message: error.message})
  }
});

router.post("/RemoveProduct", verifyToken, verifyAdmin, async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    res
      .status(400)
      .json(
        "Please enter at least the name, size, colour, and gender of the product you want to delete"
      );
      return
  }

  try {
    if (await AdminService.removeShoe(product_id)) {
      res.status(201).json({ message: "Shoe successfully removed from DB" });
    } else {
      res.status(408).json({ message: "Shoe not removed from DB" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/UpdateProduct", verifyToken, verifyAdmin, async (req, res) => {
  /* My thinking is to use 2 JSON objects for update requests, one that can identify the product and one that contains the changes to be made to its entry in the DB:
       {
        "product_id" : __
        },
        "update" : {
         "name" : __
         "size" : __
         etc.
        }
       }
    */

  const { product_id, update } = req.body;

  if (!product_id) {
    // Values required to find product in the DB (include gender?)
    res.status(400);
    throw new Error("Insufficient info for updating product");
  }

  if (!update) {
    res.status(400);
    throw new Error("No info given to update product with");
  }

  try {
    if (await AdminService.updateShoe(product_id, update)) {
      res.status(201).json({ message: "Product successfully updated" });
    } else {
      res.status(408).json({ message: "Unable to update product" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Does not update Password, isAdmin, user_id or cart_id
 */
router.post("/UpdateCustInfo", verifyToken, verifyAdmin, async (req, res) => {
  const { email, update } = req.body;

  if (!email) {
    res.status(400).json({ message: "Insufficient info for updating user" });
  }

  if (!update) {
    res.status(400).json({ message: "No info given to update user with" });
  }

  try {
    if (await AdminService.updateUser(email, update)) {
      res.status(201).json({ message: "User successfully updated" });
    } else {
      res.status(408).json({ message: "Unable to update user" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/GetAllCustomers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const response = await AdminService.getAllUsers()
    res.json({data: response})
  } catch (err) {
    console.log(err.message)
    res.json({data: []})
  }
})

router.post('/RemoveCustomer', verifyToken, verifyAdmin, async (req, res) => {
  
})

module.exports = router;
