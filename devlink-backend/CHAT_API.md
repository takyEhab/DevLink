# Chat API

All chat HTTP endpoints require the authentication cookie set during login or registration.

## Conversations

- `GET /api/chats` lists the authenticated user's conversations, latest message, and unread count.
- `POST /api/chats` creates or returns a conversation. Body: `{ "participantId": 2 }`.
- `GET /api/chats/:conversationId/messages` returns message history and marks incoming messages as read.
- `POST /api/chats/:conversationId/messages` persists a message. Body: `{ "content": "Hello" }`.
- `PATCH /api/chats/:conversationId/read` marks incoming messages as read.

## WebSocket

Connect Socket.IO to the backend origin, for example `http://localhost:3000`, with credentials enabled. The browser sends the existing `token` cookie during the handshake.

Events:

- `join_conversation` with a conversation ID. The server verifies membership before joining the room.
- `send_message` with `{ conversationId, content }`. The server validates membership, saves the message, and broadcasts `new_message` to the room.
- `new_message` contains the persisted message for every participant.
- `mark_read` with a conversation ID marks incoming messages as read.
