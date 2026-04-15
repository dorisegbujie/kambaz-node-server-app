import EnrollmentModel from "./model.js";

export const findCoursesForUser = async (userId) => {
  const enrollments = await EnrollmentModel.find({ user: userId }).populate("course");
  return enrollments.map((e) => e.course);
};

export const findUsersForCourse = async (courseId) => {
  const enrollments = await EnrollmentModel.find({ course: courseId }).populate("user");
  return enrollments.map((e) => e.user);
};

export const enrollUserInCourse = (userId, courseId) =>
  EnrollmentModel.create({ _id: `${userId}-${courseId}`, user: userId, course: courseId });

export const unenrollUserFromCourse = (userId, courseId) =>
  EnrollmentModel.deleteOne({ user: userId, course: courseId });

export const unenrollAllUsersFromCourse = (courseId) =>
  EnrollmentModel.deleteMany({ course: courseId });
