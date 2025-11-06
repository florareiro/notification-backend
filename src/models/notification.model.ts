import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  deletedAt?: Date | null;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const NotificationModel = model<INotification>(
  "Notification",
  NotificationSchema
);
