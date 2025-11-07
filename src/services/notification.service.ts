import { NotificationModel, INotification } from "../models/notification.model";
import { ApiError } from "../utils/ApiError";
import {
  CreateNotificationValidation,
  ListNotificationsValidation,
} from "../validators/notification.validator";

export const NotificationService = {
  async createNotification(
    payload: CreateNotificationValidation
  ): Promise<INotification> {
    const notif = await NotificationModel.create(payload);
    return notif;
  },

  async listNotifications(params: ListNotificationsValidation) {
    const { userId, page, limit } = params;
    const filter = { userId, deletedAt: null };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      NotificationModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      NotificationModel.countDocuments(filter),
    ]);

    if (total < 1) {
      throw new ApiError(
        404,
        `Nenhuma notificação encontrada para o usuário '${userId}'.`
      );
    }

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  },

  async markAsRead(id: string) {
    const notification = await NotificationModel.findById(id);

    if (!notification || notification.deletedAt) {
      throw new ApiError(404, "Notificação não encontrada.");
    }

    if (notification.read) {
      return notification;
    }

    notification.read = true;
    await notification.save();

    return notification;
  },
};
