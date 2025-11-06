import { NotificationModel, INotification } from "../models/notification.model";
import { CreateNotificationInput } from "../validators/notification.validator";

export const NotificationService = {
  async createNotification(
    payload: CreateNotificationInput
  ): Promise<INotification> {
    const notif = await NotificationModel.create(payload);
    return notif;
  },
};
