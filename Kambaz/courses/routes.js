import * as dao from "./dao.js";
import * as modulesDao from "../modules/dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const deleteCourse = async (req, res) => {
    await dao.deleteCourse(req.params.courseId);
    res.sendStatus(200);
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    await dao.updateCourse(courseId, req.body);
    res.sendStatus(204);
  };

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = await modulesDao.createModule(courseId, req.body);
    res.json(module);
  };

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
