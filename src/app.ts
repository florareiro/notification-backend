import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notificationRoutes from "./routes/notification.routes";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/notifications", notificationRoutes);

setupSwagger(app);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`);
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error("Erro ao iniciar:", err);
    process.exit(1);
  });
}

export default app;
