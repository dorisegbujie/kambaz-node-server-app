import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import Database from "../Database/index.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export const findAllCourses = () =>
  CourseModel.find({}, { name: 1, description: 1 });

export const findCoursesForEnrolledUser = async (userId) => {
  const enrollments = Database.enrollments.filter((e) => e.user === userId);
  const courseIds = enrollments.map((e) => e.course);
  return CourseModel.find({ _id: { $in: courseIds } });
};

export const createCourse = (course) =>
  CourseModel.create({ ...course, _id: uuidv4() });

export const deleteCourse = (courseId) =>
  CourseModel.deleteOne({ _id: courseId });

export const updateCourse = (courseId, courseUpdates) =>
  CourseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
