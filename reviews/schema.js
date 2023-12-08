import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "UsersModel" },
    review: String,
  },
  { timestamps: true },
  { collection: "reviews" }
);

export default reviewsSchema;
