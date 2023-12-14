import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "UsersModel",
      required: true,
    },
    movieId: { type: String, required: true },
    review: { type: String, required: true },
  },
  { collection: "reviews" }
);

export default reviewsSchema;
