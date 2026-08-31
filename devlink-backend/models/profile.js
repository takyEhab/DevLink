const normalizeSkills = (value) => {
  if (Array.isArray(value)) return value.slice(0, 10);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch (error) {
    return [];
  }
};

const Profile = {
  async findOneByUserId(userId) {
    const { query } = await import("../database/mongodb.js");
    const [rows] = await query(
      `SELECT p.*, u.name, u.email
       FROM profiles p
       JOIN users u ON u.id = p.user_id
       WHERE p.user_id = ? LIMIT 1`,
      [userId],
    );

    if (!rows[0]) return null;

    const profile = rows[0];
    return {
      ...profile,
      skills: normalizeSkills(profile.skills),
      user: { id: profile.user_id, name: profile.name, email: profile.email },
    };
  },

  async create(profileData) {
    const { query } = await import("../database/mongodb.js");

    const [result] = await query(
      `INSERT INTO profiles (user_id, title, location, skills, bio, education, portfolio, github, linkedin)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profileData.userId,
        profileData.title || null,
        profileData.location || null,
        JSON.stringify(normalizeSkills(profileData.skills)),
        profileData.bio || null,
        profileData.education || null,
        profileData.portfolio || null,
        profileData.github || null,
        profileData.linkedIn || null,
      ],
    );

    const [rows] = await query(
      `SELECT p.*, u.name, u.email
       FROM profiles p
       JOIN users u ON u.id = p.user_id
       WHERE p.id = ? LIMIT 1`,
      [result.insertId],
    );

    const profile = rows[0];
    return {
      ...profile,
      skills: normalizeSkills(profile.skills),
      user: { id: profile.user_id, name: profile.name, email: profile.email },
    };
  },

  async updateByUserId(userId, profileData) {
    const { query } = await import("../database/mongodb.js");

    await query(
      `UPDATE profiles
       SET title = ?, location = ?, skills = ?, bio = ?, education = ?, portfolio = ?, github = ?, linkedin = ?
       WHERE user_id = ?`,
      [
        profileData.title || null,
        profileData.location || null,
        JSON.stringify(normalizeSkills(profileData.skills)),
        profileData.bio || null,
        profileData.education || null,
        profileData.portfolio || null,
        profileData.github || null,
        profileData.linkedIn || null,
        userId,
      ],
    );

    return this.findOneByUserId(userId);
  },
};

export default Profile;
