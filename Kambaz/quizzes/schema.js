import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  _id: String,
  text: String,
  correct: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  _id: String,
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "fill-in-blank"],
    default: "multiple-choice",
  },
  title: { type: String, default: "" },
  points: { type: Number, default: 1 },
  question: { type: String, default: "" },
  choices: [choiceSchema],
  correctAnswer: { type: Boolean, default: true },
  possibleAnswers: [String],
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "Unnamed Quiz" },
    course: { type: String, required: true },
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: String, default: "" },
    availableDate: { type: String, default: "" },
    untilDate: { type: String, default: "" },
    published: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;
