import UserRoutes from "./users/routes.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";

export default function KambazRoutes(app) {
  UserRoutes(app);
  CourseRoutes(app);
  ModuleRoutes(app);
  AssignmentRoutes(app);
}
