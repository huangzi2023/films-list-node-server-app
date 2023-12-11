import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "UsersModel" },
    imdbID: String,
    review: String,
  },
  { collection: "reviews" }
);

export default reviewsSchema;
