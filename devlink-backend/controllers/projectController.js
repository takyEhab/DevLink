import Project from "../models/project.js";

export const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubLink, liveDemo, duration } =
      req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const project = await Project.create({
      userId: req.user.userId,
      title,
      description,
      technologies,
      githubLink,
      liveDemo,
      duration,
      image: imageUrl,
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getProjectsByUser = async (req, res, next) => {
  try {
    const projects = await Project.findByUserId(req.params.userId);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};
