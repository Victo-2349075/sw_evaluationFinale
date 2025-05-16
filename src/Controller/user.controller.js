// src/Controller/user.controller.js


import sql from "../config/db_pg.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

/**
 * Crée un nouvel utilisateur dans la base de données.
 * - Vérifie que tous les champs requis sont fournis.
 * - Hache le mot de passe avec bcrypt.
 * - Génère une clé API unique avec crypto.
 * - Insère les informations dans la table "usager".
 * - Retourne un message de succès et la clé API.
 */
const createUser = (req, res) => {
  const { prenom, nom, courriel, mot_de_passe } = req.body;
  if (!prenom || !nom || !courriel || !mot_de_passe) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const hash = bcrypt.hashSync(mot_de_passe, 10);
  const apiKey = crypto.randomBytes(32).toString("hex");

  sql.query(
    "INSERT INTO utilisateur (prenom, nom, courriel, mot_de_passe, api_key) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [prenom, nom, courriel, hash, apiKey],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur DB", error: err });
      res.status(201).json({ message: "Usager créé", apiKey });
    }
  );
};
/**
 * Récupère ou génère une clé API pour un utilisateur existant.
 * - Vérifie que le courriel et le mot de passe sont fournis.
 * - Recherche l’utilisateur dans la base de données.
 * - Vérifie la validité du mot de passe.
 * - Si "nouveau" est vrai, génère une nouvelle clé API et la sauvegarde.
 * - Sinon, retourne la clé API existante.
 */
const getOrGenerateApiKey = (req, res) => {
  const { courriel, mot_de_passe, nouveau } = req.body;
  if (!courriel || !mot_de_passe) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  sql.query("SELECT * FROM utilisateur WHERE courriel = $1", [courriel], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur DB", error: err });
    if (result.rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const user = result.rows[0];
    if (!bcrypt.compareSync(mot_de_passe, user.mot_de_passe)) {
      return res.status(401).json({ message: "Mot de passe invalide" });
    }

    if (nouveau) {
      const newKey = crypto.randomBytes(32).toString("hex");
      sql.query("UPDATE utilisateur SET api_key = $1 WHERE id = $2", [newKey, user.id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur DB", error: err });
        return res.json({ apiKey: newKey });
      });
    } else {
      res.json({ apiKey: user.api_key });
    }
  });
};

// Exportation par défaut
export default { createUser, getOrGenerateApiKey };
