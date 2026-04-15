import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    res.json(status);
  };

  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await dao.updateModule(courseId, moduleId, req.body);
    res.json(status);
  };

  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
}
