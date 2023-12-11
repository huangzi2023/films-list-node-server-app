import mongoose from "mongoose";
import reviewsSchema from "./schema.js";

const reviewsModel = mongoose.model("ReviewsModel", reviewsSchema);
export default reviewsModel;
