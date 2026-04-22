import * as dao from "./dao.js";
import * as quizDao from "../quizzes/dao.js";

export default function QuizAttemptRoutes(app) {
  const getLatestAttempt = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }
    const attempt = await dao.findLatestAttempt(quizId, currentUser._id);
    res.json(attempt || null);
  };

  const getAttemptCount = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }
    const count = await dao.countAttempts(quizId, currentUser._id);
    res.json({ count });
  };

  const submitAttempt = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }

    const { answers, courseId } = req.body;
    const quiz = await quizDao.findQuizById(quizId);
    if (!quiz) { res.sendStatus(404); return; }

    // grade the attempt
    let score = 0;
    for (const question of quiz.questions) {
      const submitted = answers.find((a) => a.questionId === question._id);
      if (!submitted) continue;

      if (question.type === "multiple-choice") {
        const correct = question.choices.find((c) => c.correct);
        if (correct && submitted.answer === correct._id) {
          score += question.points;
        }
      } else if (question.type === "true-false") {
        if (submitted.answer === question.correctAnswer) {
          score += question.points;
        }
      } else if (question.type === "fill-in-blank") {
        const normalized = (submitted.answer || "").toLowerCase().trim();
        const match = question.possibleAnswers.some(
          (a) => a.toLowerCase().trim() === normalized
        );
        if (match) score += question.points;
      }
    }

    const attempt = await dao.createAttempt(
      quizId,
      currentUser._id,
      courseId,
      answers,
      score
    );
    res.json(attempt);
  };

  app.get("/api/quizzes/:quizId/attempt", getLatestAttempt);
  app.get("/api/quizzes/:quizId/attempt/count", getAttemptCount);
  app.post("/api/quizzes/:quizId/attempt", submitAttempt);
}
