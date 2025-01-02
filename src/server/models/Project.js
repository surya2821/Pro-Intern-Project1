import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    fundingGoal: { type: String, required: true },
    currentFunding: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Project = mongoose.model("Project", projectSchema); // Use valid syntax

export default Project;
