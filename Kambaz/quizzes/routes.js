import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };

  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const quiz = await dao.createQuiz(courseId, req.body);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.updateQuiz(quizId, req.body);
    const updated = await dao.findQuizById(quizId);
    res.json(updated);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.deleteQuiz(quizId);
    res.sendStatus(200);
  };

  const publishQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.publishQuiz(quizId);
    res.sendStatus(200);
  };

  const unpublishQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.unpublishQuiz(quizId);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.put("/api/quizzes/:quizId/publish", publishQuiz);
  app.put("/api/quizzes/:quizId/unpublish", unpublishQuiz);
}
