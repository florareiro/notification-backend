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

test("lista notificações paginadas por usuário", async () => {
  // cria 15 notificações para o mesmo usuário
  const userId = "user-paginated";
  const payload = { userId, title: "Olá", message: "Teste" };
  for (let i = 0; i < 15; i++) {
    await NotificationService.createNotification(payload);
  }

  const page1 = await NotificationService.listNotifications({
    userId,
    page: 1,
    limit: 10,
  });
  const page2 = await NotificationService.listNotifications({
    userId,
    page: 2,
    limit: 10,
  });

  expect(page1.data.length).toBe(10);
  expect(page2.data.length).toBe(5);
  expect(page1.total).toBe(15);
  expect(page1.pages).toBe(2);
});
