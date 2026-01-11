import express from "express";
import dotenv from "dotenv";
import { router } from "../src/routes/routes";
import Database from "./database/database";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.disable("x-powered-by");
// Banco de dados

async function consulta() {
  const c = await Database.query("SELECT 1");
  console.log(c.rows);
  return c;
}

consulta();

// Middlewares
app.use(express.json());

// Rotas centralizadas
app.use("/", router);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 HealthyDog rodando na porta ${port}`);
});
