import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User schema
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    technologies: [String], // e.g. ["React", "Node.js", "MongoDB"]
    githubLink: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    image: {
      type: String, // you can store a URL or filename
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
