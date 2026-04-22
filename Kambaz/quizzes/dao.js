import { v4 as uuidv4 } from "uuid";
import QuizModel from "./model.js";

export const findQuizzesForCourse = (courseId) =>
  QuizModel.find({ course: courseId });

export const findQuizById = (quizId) => QuizModel.findById(quizId);

export const createQuiz = (courseId, quiz) =>
  QuizModel.create({ ...quiz, course: courseId, _id: uuidv4() });

export const updateQuiz = (quizId, quiz) =>
  QuizModel.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = (quizId) => QuizModel.deleteOne({ _id: quizId });

export const publishQuiz = (quizId) =>
  QuizModel.updateOne({ _id: quizId }, { $set: { published: true } });

export const unpublishQuiz = (quizId) =>
  QuizModel.updateOne({ _id: quizId }, { $set: { published: false } });
