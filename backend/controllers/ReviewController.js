const express = require("express");
const router = express.Router();

const ReviewService = require("../services/ReviewService.js");
const verifyToken = require("../config/verifyToken.js");

// Add review
router.post("/AddReview", verifyToken, async (req, res) => {
  const { product_id, user_id, title, name, rating, comment } = req.body;
  if (!product_id || !user_id || !title || !name || !rating || !comment) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }
  try {
    const response = await ReviewService.addReview(
      product_id,
      user_id,
      title,
      name,
      rating,
      comment
    );
    res.status(201).json({
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

// delete review
router.post("/DeleteReview/:id", verifyToken, async (req, res) => {
  console.log("nakda");
  const review_id = req.params.id;
  try {
    const response = await ReviewService.deleteReview(review_id);
    res.status(201).json({
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

// get reviews by user id
router.get("/GetUserReviews/:id", verifyToken, async (req, res) => {
  const user_id = req.params.id;
  try {
    const response = await ReviewService.getUserReviews(user_id);
    res.status(201).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

// get reviews by product id
router.get("/GetProductReviews/:id", async (req, res) => {
  const product_id = req.params.id;
  try {
    const response = await ReviewService.getProductReviews(product_id);
    res.status(201).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

// router.post("/AddAverageRating", async (req, res) => {
//   const response = ReviewService.addAverageRating();
//   res.status(201).json({
//     message: "Successfully added average rating",
//   });
// });

module.exports = router;
