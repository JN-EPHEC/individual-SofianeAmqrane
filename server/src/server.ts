import express from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '../public')));

sequelize.authenticate()
  .then(() => console.log('Connexion à la DB réussie !'))
  .catch(err => console.error('Erreur DB :', err));

sequelize.sync()
  .then(() => {
    console.log('Synchronisation OK');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Erreur sync :', err));

app.use(errorHandler);