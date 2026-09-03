import { query } from "../database/mongodb.js";

const normalizeParticipants = (firstUserId, secondUserId) =>
  Number(firstUserId) < Number(secondUserId)
    ? [firstUserId, secondUserId]
    : [secondUserId, firstUserId];

const mapMessage = (message) => ({
  id: message.id,
  conversationId: message.conversation_id,
  senderId: message.sender_id,
  sender:
    String(message.sender_id) === String(message.current_user_id)
      ? "me"
      : "other",
  content: message.content,
  timestamp: message.created_at,
  status: message.read_at ? "read" : "sent",
});

const Chat = {
  async userExists(userId) {
    const [rows] = await query("SELECT id FROM users WHERE id = ? LIMIT 1", [
      userId,
    ]);
    return Boolean(rows[0]);
  },

  async findOrCreateConversation(firstUserId, secondUserId) {
    const [participantOne, participantTwo] = normalizeParticipants(
      firstUserId,
      secondUserId,
    );

    await query(
      `INSERT INTO conversations (participant_one_id, participant_two_id)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE updated_at = updated_at`,
      [participantOne, participantTwo],
    );

    const [rows] = await query(
      `SELECT c.id, c.participant_one_id, c.participant_two_id,
              c.created_at, c.updated_at,
              other.id AS other_id, other.name AS other_name,
              p.title AS other_title
       FROM conversations c
       JOIN users other ON other.id = IF(c.participant_one_id = ?, c.participant_two_id, c.participant_one_id)
      LEFT JOIN profiles p ON p.user_id = other.id
       WHERE c.participant_one_id = ? AND c.participant_two_id = ?
       LIMIT 1`,
      [firstUserId, participantOne, participantTwo],
    );

    return rows[0];
  },

  async findConversationForUser(conversationId, userId) {
    const [rows] = await query(
      `SELECT c.id, c.participant_one_id, c.participant_two_id
       FROM conversations c
       WHERE c.id = ? AND (c.participant_one_id = ? OR c.participant_two_id = ?)
       LIMIT 1`,
      [conversationId, userId, userId],
    );
    return rows[0] || null;
  },

  async listConversations(userId) {
    const [rows] = await query(
      `SELECT c.id, c.updated_at,
              other.id AS other_id, other.name AS other_name,
              p.title AS other_title,
              last_message.content AS last_message,
              last_message.created_at AS last_message_at,
              (SELECT COUNT(*) FROM messages unread
               WHERE unread.conversation_id = c.id
                 AND unread.sender_id <> ? AND unread.read_at IS NULL) AS unread
       FROM conversations c
       JOIN users other ON other.id = IF(c.participant_one_id = ?, c.participant_two_id, c.participant_one_id)
       LEFT JOIN profiles p ON p.user_id = other.id
       LEFT JOIN messages last_message ON last_message.id = (
         SELECT MAX(latest.id) FROM messages latest WHERE latest.conversation_id = c.id
       )
       WHERE c.participant_one_id = ? OR c.participant_two_id = ?
       ORDER BY COALESCE(last_message.created_at, c.updated_at) DESC`,
      [userId, userId, userId, userId],
    );

    return rows.map((conversation) => ({
      id: conversation.id,
      name: conversation.other_name,
      avatar: null,
      role: conversation.other_title || "Developer",
      company: "",
      lastMessage: conversation.last_message || "No messages yet",
      timestamp: conversation.last_message_at || conversation.updated_at,
      unread: Number(conversation.unread),
      online: false,
    }));
  },

  async listMessages(conversationId, userId) {
    const [rows] = await query(
      `SELECT m.id, m.conversation_id, m.sender_id, m.content,
              m.created_at, m.read_at, ? AS current_user_id
       FROM messages m
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC, m.id ASC`,
      [userId, conversationId],
    );
    return rows.map(mapMessage);
  },

  async createMessage(conversationId, senderId, content) {
    const [result] = await query(
      `INSERT INTO messages (conversation_id, sender_id, content)
       VALUES (?, ?, ?)`,
      [conversationId, senderId, content],
    );

    const [rows] = await query(
      `SELECT id, conversation_id, sender_id, content, created_at,
              read_at, ? AS current_user_id
       FROM messages WHERE id = ? LIMIT 1`,
      [senderId, result.insertId],
    );

    return mapMessage(rows[0]);
  },

  async markRead(conversationId, userId) {
    await query(
      `UPDATE messages SET read_at = CURRENT_TIMESTAMP
       WHERE conversation_id = ? AND sender_id <> ? AND read_at IS NULL`,
      [conversationId, userId],
    );
  },
};

export default Chat;
