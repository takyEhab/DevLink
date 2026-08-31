const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const User = {
  async findOneByEmail(email) {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query("SELECT * FROM users WHERE email = ? LIMIT 1", [
      email,
    ]);
    return rows[0] || null;
  },

  async findById(id) {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
      [id],
    );
    return rows[0] || null;
  },

  async create({ name, email, password, role = "user" }) {
    const { query } = await import("../database/mongodb.js");

    if (!name || !email || !password) {
      throw new Error("Name, email and password are required");
    }
    if (!validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    const [result] = await query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role],
    );

    const [rows] = await query(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
      [result.insertId],
    );

    return rows[0];
  },
};

export default User;
