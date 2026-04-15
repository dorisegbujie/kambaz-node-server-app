import * as dao from "./dao.js";
import * as modulesDao from "../modules/dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const deleteCourse = async (req, res) => {
    await enrollmentsDao.unenrollAllUsersFromCourse(req.params.courseId);
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

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      uid = currentUser._id;
    }
    const enrollment = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      uid = currentUser._id;
    }
    await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(200);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };

  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
}
