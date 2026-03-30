import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourses = () => Database.courses;

export const findCoursesForEnrolledUser = (userId) => {
  const enrollments = Database.enrollments.filter((e) => e.user === userId);
  return enrollments.map((e) =>
    Database.courses.find((c) => c._id === e.course)
  ).filter(Boolean);
};

export const createCourse = (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses.push(newCourse);
  return newCourse;
};

export const deleteCourse = (courseId) => {
  const index = Database.courses.findIndex((c) => c._id === courseId);
  if (index !== -1) Database.courses.splice(index, 1);
};

export const updateCourse = (courseId, courseUpdates) => {
  const index = Database.courses.findIndex((c) => c._id === courseId);
  if (index === -1) return null;
  Database.courses[index] = { ...Database.courses[index], ...courseUpdates };
  return Database.courses[index];
};
