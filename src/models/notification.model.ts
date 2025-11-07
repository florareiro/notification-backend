import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface INotification extends Document {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  deletedAt?: Date | null;
}

const NotificationSchema = new Schema<INotification>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    userId: { type: String, required: true },
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
