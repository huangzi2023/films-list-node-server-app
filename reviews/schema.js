import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "UsersModel" },
    movieId: String,
    review: String,
  },
  { collection: "reviews" }
);

export default reviewsSchema;
