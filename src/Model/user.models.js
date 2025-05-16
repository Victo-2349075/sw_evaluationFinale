const db = require('../config/db_pg');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
module.exports = {
  // Ajouter un nouvel utilisateur avec mot de passe chiffré et clé API générée
  ajouter: async (nom, prenom, courriel, motdepasse, callback) => {
    const hash = await bcrypt.hash(motdepasse, 10); // Chiffre le mot de passe
    const apiKey = crypto.randomBytes(16).toString('hex'); // Génère une clé API unique
    db.query('INSERT INTO utilisateur (nom, prenom, courriel, motdepasse, api_key) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, courriel, hash, apiKey], callback);
  },
  // Récupérer un utilisateur par courriel
  trouverParCourriel: (courriel, callback) => {
    db.query('SELECT * FROM utilisateur WHERE courriel = ?', [courriel], callback);
  },
  // Mettre à jour la clé API d’un utilisateur
  regenererCle: (courriel, nouvelleCle, callback) => {
    db.query('UPDATE utilisateur SET api_key = ? WHERE courriel = ?', [nouvelleCle, courriel], callback);
  }
};
