// routes/user.route.js
// Déclare les routes pour les utilisateurs
// src/Route/user.route.js
import express from 'express';
import userController from '../Controller/user.controller.js';

const router = express.Router();

router.post('/utilisateurs', userController.createUser);
router.post('/utilisateur/cle', userController.getOrGenerateApiKey);

export default router;
