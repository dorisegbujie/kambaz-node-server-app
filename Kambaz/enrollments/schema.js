import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    user: { type: String, ref: "UserModel" },
    course: { type: String, ref: "CourseModel" },
    lastActivity: Date,
    enrollmentDate: { type: Date, default: Date.now },
    grade: { type: String, default: "Not Graded" },
    status: {
      type: String,
      enum: ["ENROLLED", "UNENROLLED", "PENDING"],
      default: "ENROLLED",
    },
  },
  { collection: "enrollments" }
);

export default schema;
