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
  const payload = {
    userId: "user-123",
    title: "Bem-vindo",
    message: "Sua conta foi criada",
  };
  const created = await NotificationService.createNotification(payload);
  expect(created).toBeDefined();
  expect(created._id).toBeDefined();
  expect(created.userId).toBe(payload.userId);
  expect(created.read).toBe(false);
});

test("marca uma notificação como lida", async () => {
  const notif = (await NotificationService.createNotification({
    userId: "user-test-read",
    title: "Notificação não lida",
    message: "Mensagem teste",
  })) as any;

  expect(notif.read).toBe(false);

  const updated = await NotificationService.markAsRead(notif._id.toString());

  expect(updated.read).toBe(true);
});
