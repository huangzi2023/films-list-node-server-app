import usersModel from "./model.js";

export const createUser = (user) => usersModel.create(user);

export const findUserByCredential = (username, password) =>
  usersModel.findOne({ username, password });

export const findAllUsers = () => usersModel.find();

export const findUserById = (userId) => usersModel.findById(userId);

export const findUserByUsername = (username) =>
  usersModel.findOne({ username: username });

export const updateUser = (userId, user) =>
  usersModel.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => usersModel.deleteOne({ _id: userId });
