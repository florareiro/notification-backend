import { Request, Response, NextFunction } from "express";
import { NotificationService } from "../services/notification.service";

export const NotificationController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const created = await NotificationService.createNotification(payload);
      res.status(201).json({ success: true, data: created });
    } catch (err) {
      next(err);
    }
  },
};
