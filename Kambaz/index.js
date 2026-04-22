import UserRoutes from "./users/routes.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import QuizRoutes from "./quizzes/routes.js";
import QuizAttemptRoutes from "./quizAttempts/routes.js";

export default function KambazRoutes(app) {
  UserRoutes(app);
  CourseRoutes(app);
  ModuleRoutes(app);
  AssignmentRoutes(app);
  QuizRoutes(app);
  QuizAttemptRoutes(app);
}
