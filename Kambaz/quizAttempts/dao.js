import { v4 as uuidv4 } from "uuid";
import AttemptModel from "./model.js";

export const findAttemptsByUser = (quizId, userId) =>
  AttemptModel.find({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });

export const findLatestAttempt = (quizId, userId) =>
  AttemptModel.findOne({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });

export const countAttempts = (quizId, userId) =>
  AttemptModel.countDocuments({ quiz: quizId, user: userId });

export const createAttempt = async (quizId, userId, courseId, answers, score) => {
  const count = await countAttempts(quizId, userId);
  return AttemptModel.create({
    _id: uuidv4(),
    quiz: quizId,
    user: userId,
    course: courseId,
    answers,
    score,
    attemptNumber: count + 1,
    dateTaken: new Date(),
  });
};
