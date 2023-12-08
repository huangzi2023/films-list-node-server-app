import mongoose from "mongoose";

const moviesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    year: String,
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "producersModel",
      },
    ],
    directors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "producersModel",
      },
    ],
    genres: [String],
    imdb: String,
    rating: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviewsModel" }],
  },
  { collection: "movies" }
);

export default moviesSchema;
