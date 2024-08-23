const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");

class ReviewDAO {
  // static async addAverageRating() {
  //   const agg = [
  //     {
  //       $lookup: {
  //         from: "reviews",
  //         localField: "_id",
  //         foreignField: "product_id",
  //         as: "reviews",
  //       },
  //     },
  //     {
  //       $addFields: {
  //         rating: {
  //           $cond: {
  //             if: {
  //               $gt: [
  //                 {
  //                   $size: "$reviews",
  //                 },
  //                 0,
  //               ],
  //             },
  //             then: {
  //               $avg: "$reviews.rating",
  //             },
  //             else: 0,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       $project: {
  //         rating: 1,
  //         brand: 1,
  //         size: 1,
  //         name: 1,
  //         colour: 1,
  //         gender: 1,
  //         stock: 1,
  //         price: 1,
  //         category: 1,
  //         image: 1,
  //       },
  //     },
  //   ];
  //   try {
  //     const result = await Product.aggregate(agg);
  //     if (result) {
  //       for (let i = 0; i < result.length; i++) {
  //         const productId = result[i]._id;
  //         const newRating = result[i].rating;

  //         await Product.updateOne(
  //           { _id: productId },
  //           { $set: { rating: newRating } }
  //         );
  //       }
  //       return "Average rating added successfully";
  //     }
  //   } catch (err) {
  //     throw new Error("Error updating product ratings", err);
  //   }
  // }
  static async addReview(product_id, user_id, title, name, rating, comment) {
    try {
      const review = await Review.create({
        product_id,
        user_id,
        title,
        name,
        rating,
        comment,
      });
      if (review) {
        await ReviewDAO.updateAverageRating(product_id);
        return "Review added successfully";
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteReview(review_id) {
    try {
      const review = await Review.findByIdAndDelete({ _id: review_id });
      if (review) {
        await ReviewDAO.updateAverageRating(review.product_id);
        return "Review deleted successfully";
      }
      return review;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getProductReviews(product_id) {
    try {
      const reviews = await Review.find({ product_id: product_id });
      return reviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserReviews(user_id) {
    try {
      const reviews = await Review.find({ user_id: user_id });
      return reviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateAverageRating(product_id) {
    try {
      const reviews = await Review.find({ product_id: product_id });
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          : 0;
      await Product.findByIdAndUpdate(product_id, {
        rating: avgRating,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ReviewDAO;
