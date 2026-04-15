import mongoose from "mongoose";
import moduleSchema from "../modules/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: String,
    endDate: String,
    credits: Number,
    image: String,
    description: String,
    modules: [moduleSchema],
  },
  { collection: "courses" }
);

export default courseSchema;
