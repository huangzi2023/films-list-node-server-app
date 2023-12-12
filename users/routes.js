import * as dao from "./dao.js";

const UsersRoutes = (app) => {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const createUser = async (req, res) => {
    const newUser = req.body;
    const actualUser = await dao.createUser(newUser);
    res.json(actualUser);
  };

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const status = await dao.deleteUser(userId);
    res.json(status);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    const status = await dao.updateUser(userId, updates);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const addFavoriteMovie = async (req, res) => {
    const userId = req.params.userId;
    const movieToAdd = req.body.movieId;

    try {
      const user = await dao.findUserById(userId);
      if (!user) {
        res.sendStatus(404);
        return;
      }

      if (user.favoriteMovies.includes(movieToAdd)) {
        res.status(400).send("Movie already added to your favorite list");
        return;
      }

      user.favoriteMovies.push(movieToAdd);
      await dao.updateUser(userId, user);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  const deleteFavoriteMovie = async (req, res) => {
    const userId = req.params.userId;
    const movieToDelete = req.body.movieId;
    try {
      const user = await dao.findUserById(userId);
      if (!user) {
        res.sendStatus(404);
        return;
      }
      const index = user.favoriteMovies.indexOf(movieToDelete);
      if (index !== -1) {
        user.favoriteMovies.splice(index, 1);
        await dao.updateUser(userId, user);
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  const register = async (req, res) => {
    const user = req.body;
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
      res.sendStatus(403);
      return;
    }
    const currentUser = await dao.createUser(user);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const login = async (req, res) => {
    const credentials = req.body;
    const existingUser = await dao.findUserByCredential(
      credentials.username,
      credentials.password
    );
    if (existingUser) {
      req.session["currentUser"] = existingUser;
      res.json(existingUser);
      return;
    }
    res.sendStatus(403);
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  app.put("/api/users/:userId", updateUser);

  app.post("/api/users", createUser);
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", logout);

  app.delete("/api/users/:userId", deleteUser);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);

  app.post("/api/users/:userId/favoriteMovies", addFavoriteMovie);
  app.delete("/api/users/:userId/favoriteMovies", deleteFavoriteMovie);
};
export default UsersRoutes;
