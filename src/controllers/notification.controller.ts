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

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await NotificationService.listNotifications(
        req.query as any
      );
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  async markRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const updated = await NotificationService.markAsRead(id);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const removed = await NotificationService.deleteNotification(id);

      // Resposta consistente (200 + objeto com id e deletedAt)
      res.json({
        success: true,
        data: {
          id: removed.id,
          deletedAt: removed.deletedAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
