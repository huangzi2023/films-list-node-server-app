import * as dao from "./dao.js";

const ReviewsRoutes = (app) => {
  const createReview = async (req, res) => {
    const review = req.body;
    if (!review.author || !review.movieId) {
      res.sendStatus(400);
      return;
    }
    const actualReview = await dao.createReview(review);
    res.json(actualReview);
  };

  const findReviewsByAuthor = async (req, res) => {
    const author = req.params.author;
    const reviews = await dao.findReviewsByAuthor(author);
    res.json(reviews);
  };

  const findReviewsByMovie = async (req, res) => {
    const movie = req.params.movie;
    const reviews = await dao.findReviewsByMovie(movie);
    res.json(reviews);
  };

  app.post("/api/reviews", createReview);

  app.get("/api/users/:author/reviews", findReviewsByAuthor);
  app.get("/api/movies/:movie/reviews", findReviewsByMovie);
};
export default ReviewsRoutes;
