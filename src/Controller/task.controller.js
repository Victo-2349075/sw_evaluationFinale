import db from '../config/db.js';

const Task = {
  getAll: (userId, callback) => {
    const sql = `SELECT * FROM taches WHERE utilisateur_id = $1`;
    db.query(sql, [userId], callback);
  },

  create: (titre, description, userId, callback) => {
    const sql = `
      INSERT INTO taches (titre, description, utilisateur_id, date_debut, date_echeance, complete)
      VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', false)
      RETURNING id;
    `;
    db.query(sql, [titre, description, userId], callback);
  },

  delete: (taskId, userId, callback) => {
    const sql = `DELETE FROM taches WHERE id = $1 AND utilisateur_id = $2`;
    db.query(sql, [taskId, userId], callback);
  },

  getById: (taskId, userId, callback) => {
    const sql = `SELECT * FROM taches WHERE id = $1 AND utilisateur_id = $2`;
    db.query(sql, [taskId, userId], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]);
    });
  },

  updateStatus: (taskId, userId, status, callback) => {
    const sql = `UPDATE taches SET complete = $1 WHERE id = $2 AND utilisateur_id = $3`;
    db.query(sql, [status, taskId, userId], callback);
  },

  addSubtask: (tacheId, titre, statut, callback) => {
    const sql = `
      INSERT INTO sous_taches (tache_id, titre, complete)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    db.query(sql, [tacheId, titre, statut], callback);
  },

  updateSubtask: (subtaskId, titre, callback) => {
    const sql = `UPDATE sous_taches SET titre = $1 WHERE id = $2`;
    db.query(sql, [titre, subtaskId], callback);
  },

  updateSubtaskStatus: (subtaskId, statut, callback) => {
    const sql = `UPDATE sous_taches SET complete = $1 WHERE id = $2`;
    db.query(sql, [statut, subtaskId], callback);
  },

  deleteSubtask: (subtaskId, callback) => {
    const sql = `DELETE FROM sous_taches WHERE id = $1`;
    db.query(sql, [subtaskId], callback);
  }
};

export default Task;




