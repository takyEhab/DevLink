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
  async findById(projectId) {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query(
      `SELECT p.*, u.name AS author, pr.title AS author_title,
              pr.location AS author_location
       FROM projects p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN profiles pr ON pr.user_id = p.user_id
       WHERE p.id = ? LIMIT 1`,
      [projectId],
    );

    if (!rows[0]) return null;
    return {
      ...rows[0],
      technologies: normalizeTechnologies(rows[0].technologies),
      author: {
        id: rows[0].user_id,
        name: rows[0].author,
        title: rows[0].author_title || "Developer",
        location: rows[0].author_location,
      },
    };
  },

  async findAll() {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query(
      `SELECT p.*, u.name AS author, pr.title AS author_title
       FROM projects p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN profiles pr ON pr.user_id = p.user_id
       ORDER BY p.created_at DESC`,
    );

    return rows.map((project) => ({
      ...project,
      technologies: normalizeTechnologies(project.technologies),
      author: project.author,
      category: project.author_title || "Developer Project",
      featured: false,
      premium: false,
      likes: 0,
      views: 0,
    }));
  },

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
