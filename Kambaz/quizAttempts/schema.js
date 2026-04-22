import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  answer: mongoose.Schema.Types.Mixed,
});

const schema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, required: true },
    user: { type: String, required: true },
    course: { type: String, required: true },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    dateTaken: { type: Date, default: Date.now },
  },
  { collection: "quizAttempts" }
);

export default schema;
