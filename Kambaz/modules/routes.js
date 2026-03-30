import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = (req, res) => {
    dao.deleteModule(req.params.moduleId);
    res.sendStatus(200);
  };

  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    dao.updateModule(moduleId, req.body);
    res.sendStatus(204);
  };

  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
