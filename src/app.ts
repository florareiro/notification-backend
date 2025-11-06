import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notificationRoutes from "./routes/notification.routes";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

// routes
app.use("/notifications", notificationRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error("Erro ao iniciar:", err);
    process.exit(1);
  });
}

export default app; // export para testes
