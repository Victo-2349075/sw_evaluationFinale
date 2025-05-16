// src/middleware/apiKeyAuth.js
/**
 * Middleware d'authentification par clé API.
 * - Vérifie si une clé API est présente dans l'en-tête "x-api-key".
 * - Si absente, retourne une erreur 401 (non autorisé).
 * - Si présente, recherche un usager correspondant dans la base de données.
 * - Si aucun usager trouvé, retourne une erreur 403 (clé invalide).
 * - Si valide, ajoute l'identifiant de l'usager (req.userId) et continue.
 */
import sql from "../config/db_pg.js";

export const apiKeyAuth = (req, res, next) => {
  const routesPubliques = [
    { method: 'POST', path: '/api/utilisateur' },
    { method: 'POST', path: '/api/utilisateur/cle' },
    { method: 'PUT',  path: '/api/utilisateur/cle' }
  ];

  const estRoutePublique = routesPubliques.some(route =>
    route.method === req.method &&
    req.originalUrl.split('?')[0] === route.path
  );

  if (estRoutePublique) return next();

  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ message: "Clé API manquante" });

  sql.query("SELECT * FROM utilisateur WHERE cle_api = $1", [apiKey], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur DB", error: err });
    if (result.rows.length === 0) return res.status(403).json({ message: "Clé API invalide" });

    req.userId = result.rows[0].id;
    console.log(req.userId);
    console.log(result.rows[0].id)
    next();
  });
};
