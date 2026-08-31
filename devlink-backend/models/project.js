const normalizeTechnologies = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const Project = {
  async create(projectData) {
    const { query } = await import("../database/mongodb.js");

    const [result] = await query(
      `INSERT INTO projects (user_id, title, description, technologies, github_link, live_demo, image, duration)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectData.userId,
        projectData.title,
        projectData.description || null,
        JSON.stringify(normalizeTechnologies(projectData.technologies)),
        projectData.githubLink || null,
        projectData.liveDemo || null,
        projectData.image || null,
        projectData.duration || null,
      ],
    );

    const [rows] = await query("SELECT * FROM projects WHERE id = ? LIMIT 1", [
      result.insertId,
    ]);
    const project = rows[0];
    return {
      ...project,
      technologies: normalizeTechnologies(project.technologies),
    };
  },

  async findByUserId(userId) {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );

    return rows.map((project) => ({
      ...project,
      technologies: normalizeTechnologies(project.technologies),
    }));
  },
};

export default Project;
