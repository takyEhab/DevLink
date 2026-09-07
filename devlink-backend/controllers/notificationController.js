import Notification from "../models/notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.listForUser(req.user.userId);
    const unreadCount = await Notification.unreadCount(req.user.userId);
    res.json({ success: true, data: { notifications, unreadCount } });
  } catch (error) {
    next(error);
  }
};

export const markNotificationsRead = async (req, res, next) => {
  try {
    await Notification.markAllRead(req.user.userId);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
