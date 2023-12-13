import * as moviesDao from "./dao.js";

const MoviesRoutes = (app) => {
  const getMovieDetailsById = async (req, res) => {
    const movieId = req.params.movieId;
    try {
      const movie = await moviesDao.getMovieDetailsById(movieId);
      res.json(movie);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  app.get("/api/movie/:movieId", getMovieDetailsById);
};
export default MoviesRoutes;
