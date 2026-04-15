import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const assignment = await dao.createAssignment(courseId, req.body);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await dao.updateAssignment(assignmentId, req.body);
    res.sendStatus(204);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
