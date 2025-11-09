import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import {
  createNotificationSchema,
  listNotificationsSchema,
  idParamsSchema,
} from "../validators/notification.validator";
import { validate } from "../middlewares/validate";

const router = Router();

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Cria uma nova notificação
 *     tags:
 *       - Notificações
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - userId
 *               - title
 *               - message
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/",
  validate({ body: createNotificationSchema }),
  NotificationController.create
);

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Lista notificações de um usuário
 *     tags:
 *       - Notificações
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista paginada de notificações
 *       404:
 *         description: Nenhuma notificação encontrada
 */
router.get(
  "/",
  validate({ query: listNotificationsSchema }),
  NotificationController.list
);

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     summary: Alterna o estado de leitura de uma notificação (lida/não lida)
 *     tags:
 *       - Notificações
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notificação a ser atualizada
 *     responses:
 *       200:
 *         description: Estado de leitura da notificação atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7c1d3b5f-8e4a-4a12-b9c0-6e5c5f4f3c9a"
 *                     read:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Notificação marcada como lida."
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.patch(
  "/:id/read",
  validate({ params: idParamsSchema }),
  NotificationController.toggleRead
);

/**
 * @openapi
 * /notifications/delete/{id}:
 *   patch:
 *     summary: Marca uma notificação como excluída
 *     tags:
 *       - Notificações
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notificação a ser removida
 *     responses:
 *       200:
 *         description: Notificação marcada como deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7c1d3b5f-8e4a-4a12-b9c0-6e5c5f4f3c9a"
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-07T18:31:22.123Z"
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.patch(
  "/delete/:id",
  validate({ params: idParamsSchema }),
  NotificationController.remove
);

export default router;
