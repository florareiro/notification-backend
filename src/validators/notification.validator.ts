import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z
    .string({ error: "O campo 'userId' é obrigatório." })
    .min(3, "O campo 'userId' deve conter no mínimo 3 caracteres."),
  title: z
    .string({ error: "O campo 'title' é obrigatório." })
    .min(3, "O campo 'title' deve conter no mínimo 3 caracteres."),
  message: z
    .string({ error: "O campo 'message' é obrigatório." })
    .min(3, "O campo 'message' deve conter no mínimo 3 caracteres."),
});

export type CreateNotificationValidation = z.infer<
  typeof createNotificationSchema
>;

export const listNotificationsSchema = z.object({
  userId: z.string({ error: "O campo 'userId' é obrigatório." }),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type ListNotificationsValidation = z.infer<
  typeof listNotificationsSchema
>;

export const markAsReadParamsSchema = z.object({
  id: z.string({ error: "O parâmetro 'id' é obrigatório." }),
});
