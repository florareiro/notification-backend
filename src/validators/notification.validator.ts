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

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
