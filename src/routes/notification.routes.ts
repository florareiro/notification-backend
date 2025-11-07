import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import {
  createNotificationSchema,
  listNotificationsSchema,
  idParamsSchema,
} from "../validators/notification.validator";
import { validate } from "../middlewares/validate";

const router = Router();

router.post(
  "/",
  validate({ body: createNotificationSchema }),
  NotificationController.create
);
router.get(
  "/",
  validate({ query: listNotificationsSchema }),
  NotificationController.list
);
router.patch(
  "/:id/read",
  validate({ params: idParamsSchema }),
  NotificationController.markRead
);
router.patch(
  "/:id",
  validate({ params: idParamsSchema }),
  NotificationController.remove
);

export default router;
