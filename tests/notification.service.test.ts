import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { NotificationService } from "../src/services/notification.service";
import { NotificationModel } from "../src/models/notification.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await NotificationModel.deleteMany({});
});

test("cria notificação com dados válidos", async () => {
  const created = await NotificationService.createNotification({
    userId: "user-123",
    title: "Bem-vindo",
    message: "Sua conta foi criada",
  });
  expect(created).toBeDefined();
  expect(created._id).toBeDefined();
  expect(created.userId).toBe(created.userId);
  expect(created.read).toBe(false);
});

test("lista notificações de um usuário com paginação", async () => {
  const userId = "user-123";
  const totalNotifications = 15;

  for (let i = 0; i < totalNotifications; i++) {
    await NotificationService.createNotification({
      userId,
      title: `Notificação ${i + 1}`,
      message: `Mensagem ${i + 1}`,
    });
  }
  const result = await NotificationService.listNotifications({
    userId,
    page: 1,
    limit: 10,
  });

  expect(result.data).toHaveLength(10);
  expect(result.total).toBe(totalNotifications);
  expect(result.page).toBe(1);
  expect(result.pages).toBe(Math.ceil(totalNotifications / 10));
});

test("marca uma notificação como lida", async () => {
  const notif = await NotificationService.createNotification({
    userId: "user-123",
    title: "Notificação não lida",
    message: "Mensagem teste",
  });

  expect(notif.read).toBe(false);

  const updated = await NotificationService.markAsReadOrUnread(
    notif.id.toString()
  );

  expect(updated.read).toBe(true);
});

test("remove uma notificação (soft delete)", async () => {
  const notif = await NotificationService.createNotification({
    userId: "user-123",
    title: "Excluir depois",
    message: "Teste de exclusão",
  });

  const deleted = await NotificationService.deleteNotification(notif.id);

  expect(deleted.deletedAt).toBeInstanceOf(Date);
});
