import { v4 as uuidv4 } from "uuid";
import UserModel from "./model.js";

export const createUser = (user) =>
  UserModel.create({ _id: uuidv4(), ...user });

export const findAllUsers = () => UserModel.find();

export const findUserById = (userId) => UserModel.findById(userId);

export const findUserByUsername = (username) =>
  UserModel.findOne({ username });

export const findUserByCredentials = (username, password) =>
  UserModel.findOne({ username, password });

export const findUsersByRole = (role) => UserModel.find({ role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return UserModel.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const updateUser = (userId, user) =>
  UserModel.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });
