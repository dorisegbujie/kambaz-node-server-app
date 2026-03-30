import Database from "../Database/index.js";

export const createUser = (user) => {
  Database.users.push(user);
  return user;
};

export const findAllUsers = () => Database.users;

export const findUserById = (userId) =>
  Database.users.find((u) => u._id === userId);

export const findUserByUsername = (username) =>
  Database.users.find((u) => u.username === username);

export const findUserByCredentials = (username, password) =>
  Database.users.find((u) => u.username === username && u.password === password);

export const updateUser = (userId, user) => {
  const index = Database.users.findIndex((u) => u._id === userId);
  if (index === -1) return null;
  Database.users[index] = { ...Database.users[index], ...user };
  return Database.users[index];
};

export const deleteUser = (userId) => {
  const index = Database.users.findIndex((u) => u._id === userId);
  if (index === -1) return null;
  Database.users.splice(index, 1);
};
