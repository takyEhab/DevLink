// controllers/projectController.js
import Project from "../models/project.js";

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveDemo, duration } =
      req.body;

    // if image was uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path; // cloudinary auto adds .path with secure_url
    }
    const project = new Project({
      user: req.user.userId,
      title,
      description,
      technologies: technologies?.split(",").map((t) => t.trim()), // if comma-separated
      githubLink,
      liveDemo,
      duration,
      image: imageUrl,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.log("test err");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/projects/:userId
export const getProjectsByUser = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
