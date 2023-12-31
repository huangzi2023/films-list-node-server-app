import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import Hello from "./hello.js";
import UsersRoutes from "./users/routes.js";
import mongoose from "mongoose";
import FollowsRoutes from "./follows/routes.js";
import ReviewsRoutes from "./reviews/routes.js";
import SessionController from "./session-controller.js";
import MoviesRoutes from "./movies/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: true,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
UsersRoutes(app);
FollowsRoutes(app);
ReviewsRoutes(app);
SessionController(app);
MoviesRoutes(app);

app.listen(process.env.PORT || 4000);
