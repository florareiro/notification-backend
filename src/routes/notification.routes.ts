import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { createNotificationSchema } from "../validators/notification.validator";
import { validateBody } from "../middlewares/validate";

const router = Router();

router.post(
  "/",
  validateBody(createNotificationSchema),
  NotificationController.create
);

export default router;
