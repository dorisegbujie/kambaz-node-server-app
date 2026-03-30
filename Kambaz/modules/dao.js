import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findModulesForCourse = (courseId) =>
  Database.modules.filter((m) => m.course === courseId);

export const createModule = (module) => {
  const newModule = { ...module, _id: uuidv4() };
  Database.modules.push(newModule);
  return newModule;
};

export const deleteModule = (moduleId) => {
  const index = Database.modules.findIndex((m) => m._id === moduleId);
  if (index !== -1) Database.modules.splice(index, 1);
};

export const updateModule = (moduleId, moduleUpdates) => {
  const index = Database.modules.findIndex((m) => m._id === moduleId);
  if (index === -1) return null;
  Database.modules[index] = { ...Database.modules[index], ...moduleUpdates };
  return Database.modules[index];
};
