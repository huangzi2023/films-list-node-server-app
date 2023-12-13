import axios from "axios";

const API_KEY = process.env.EXPERNAL_API_KEY;
const EXTERNAL_API_BASE = process.env.EXTERNAL_API_BASE;

const allowedMovieFields = [
  "id",
  "title",
  "genres",
  "overview",
  "poster_path",
  "release_date",
  "vote_average",
  "vote_count",
];

export const getMovieDetailsById = async (movieId) => {
  try {
    const response = await axios.get(`${EXTERNAL_API_BASE}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return filterMovieFields(response.data);
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

const filterMovieFields = (movie) => {
  const filteredMovie = {};

  allowedMovieFields.forEach((field) => {
    if (field === "genres" && movie.hasOwnProperty("genres")) {
      filteredMovie.genres = movie.genres.map((genre) => genre.name);
    } else if (movie.hasOwnProperty(field)) {
      filteredMovie[field] = movie[field];
    }
  });
  return filteredMovie;
};
