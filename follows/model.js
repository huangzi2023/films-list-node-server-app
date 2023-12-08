import mongoose from "mongoose";
import followsSchema from "./schema.js";

const followsModel = mongoose.model("followsModel", followsSchema);

export default followsModel;
