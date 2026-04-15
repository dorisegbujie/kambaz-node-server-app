import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

export const findAssignmentsForCourse = (courseId) =>
  AssignmentModel.find({ course: courseId });

export const findAssignmentById = (assignmentId) =>
  AssignmentModel.findById(assignmentId);

export const createAssignment = (courseId, assignment) =>
  AssignmentModel.create({ ...assignment, course: courseId, _id: uuidv4() });

export const updateAssignment = (assignmentId, assignmentUpdates) =>
  AssignmentModel.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });

export const deleteAssignment = (assignmentId) =>
  AssignmentModel.deleteOne({ _id: assignmentId });
