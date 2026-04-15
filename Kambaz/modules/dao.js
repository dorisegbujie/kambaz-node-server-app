import { v4 as uuidv4 } from "uuid";
import CourseModel from "../courses/model.js";

export const findModulesForCourse = async (courseId) => {
  const course = await CourseModel.findById(courseId);
  return course.modules;
};

export const createModule = async (courseId, module) => {
  const newModule = { ...module, _id: uuidv4() };
  await CourseModel.updateOne(
    { _id: courseId },
    { $push: { modules: newModule } }
  );
  return newModule;
};

export const deleteModule = async (courseId, moduleId) => {
  const status = await CourseModel.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } }
  );
  return status;
};

export const updateModule = async (courseId, moduleId, moduleUpdates) => {
  const course = await CourseModel.findById(courseId);
  const module = course.modules.id(moduleId);
  Object.assign(module, moduleUpdates);
  await course.save();
  return module;
};
