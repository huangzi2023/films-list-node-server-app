import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    role: { type: String, enum: ["ADMIN", "FAN", "PRODUCER"] },
    favoriteMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "moviesModel",
      },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviewsModel" }],
  },
  { collection: "users" }
);

export default usersSchema;
