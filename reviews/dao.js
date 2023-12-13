import reviewsModel from "./model.js";

export const createReview = (review) => reviewsModel.create(review);

export const findReviewsByAuthor = (author) => reviewsModel.find({ author });

export const findReviewsByMovie = (movieId) =>
  reviewsModel.find({ movieId }).populate("author").exec();
