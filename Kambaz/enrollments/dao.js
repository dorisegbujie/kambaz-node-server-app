import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const enrollUserInCourse = (userId, courseId) => {
  const enrollment = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments.push(enrollment);
  return enrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
  const index = Database.enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index !== -1) Database.enrollments.splice(index, 1);
};
