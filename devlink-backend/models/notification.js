import { query } from "../database/mongodb.js";

const mapNotification = (notification) => ({
  id: notification.id,
  type: notification.type,
  title: notification.title,
  message: notification.message,
  link: notification.link,
  isRead: Boolean(notification.read_at),
  createdAt: notification.created_at,
  actor: notification.actor_name
    ? { id: notification.actor_id, name: notification.actor_name }
    : null,
});

const Notification = {
  async listForUser(userId) {
    const [rows] = await query(
      `SELECT n.*, u.name AS actor_name
       FROM notifications n
       LEFT JOIN users u ON u.id = n.actor_id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC
       LIMIT 50`,
      [userId],
    );
    return rows.map(mapNotification);
  },

  async unreadCount(userId) {
    const [rows] = await query(
      "SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND read_at IS NULL",
      [userId],
    );
    return Number(rows[0].count);
  },

  async create({ userId, actorId, type, title, message, link }) {
    const [result] = await query(
      `INSERT INTO notifications (user_id, actor_id, type, title, message, link)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, actorId || null, type, title, message, link || null],
    );
    const [rows] = await query(
      `SELECT n.*, u.name AS actor_name
       FROM notifications n
       LEFT JOIN users u ON u.id = n.actor_id
       WHERE n.id = ? LIMIT 1`,
      [result.insertId],
    );
    return mapNotification(rows[0]);
  },

  async markAllRead(userId) {
    await query(
      "UPDATE notifications SET read_at = CURRENT_TIMESTAMP WHERE user_id = ? AND read_at IS NULL",
      [userId],
    );
  },
};

export default Notification;
