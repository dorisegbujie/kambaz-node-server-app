import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";

export const findAllCourses = () => CourseModel.find();

export const createCourse = (course) =>
  CourseModel.create({ ...course, _id: uuidv4() });

export const deleteCourse = (courseId) =>
  CourseModel.deleteOne({ _id: courseId });

export const updateCourse = (courseId, courseUpdates) =>
  CourseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
