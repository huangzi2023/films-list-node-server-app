import mongoose from "mongoose";
import usersSchema from "./schema.js";

const usersModel = mongoose.model("UsersModel", usersSchema);
export default usersModel;
