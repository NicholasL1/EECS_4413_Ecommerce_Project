const ReviewDAO = require("../dao/ReviewDAO.js");

class ReviewService {
  // static async addAverageRating() {
  //   const response = await ReviewDAO.addAverageRating();
  //   return response;
  // }
  static async addReview(product_id, user_id, title, name, rating, comment) {
    const response = await ReviewDAO.addReview(
      product_id,
      user_id,
      title,
      name,
      rating,
      comment
    );
    return response;
  }

  static async deleteReview(review_id) {
    const response = await ReviewDAO.deleteReview(review_id);
    return response;
  }

  static async getProductReviews(product_id) {
    const reviews = await ReviewDAO.getProductReviews(product_id);
    return reviews;
  }

  static async getUserReviews(user_id) {
    const reviews = await ReviewDAO.getUserReviews(user_id);
    return reviews;
  }
}

module.exports = ReviewService;
