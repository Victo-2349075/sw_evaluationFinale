
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import taskRouter from './src/Route/task.route.js';
import userRouter from './src/Route/user.route.js';
import { apiKeyAuth } from './src/Middleware/apikeyAuth.js';

// Chargement des variables d'environnement (.env)
dotenv.config();

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de journalisation des requêtes
app.use(morgan('dev'));

// Middleware pour analyser les corps de requête JSON
app.use(express.json());


const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Documentation API",
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));


app.use('/api/users', userRouter); // Pas besoin de clé API

app.use(apiKeyAuth);


app.use('/api/tasks', taskRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
//https://services-web-victo.github.io/notes_de_cours/api/documentation/#exemple pour parametre et response