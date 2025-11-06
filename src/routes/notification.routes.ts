import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import {
  createNotificationSchema,
  listNotificationsSchema,
} from "../validators/notification.validator";
import { validateBody, validateQuery } from "../middlewares/validate";

const router = Router();

router.post(
  "/",
  validateBody(createNotificationSchema),
  NotificationController.create
);
router.get(
  "/",
  validateQuery(listNotificationsSchema),
  NotificationController.list
);

export default router;
