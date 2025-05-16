import db from "../config/db_pg.js";

/*
 * Modèle Task : contient les fonctions d'accès aux données
 * pour les tâches et les sous-tâches liées à un utilisateur.
 */
const Task = {
  
    //Récupère toutes les tâches d’un utilisateur.
   
  getAll(userId, cb) {
    db.query("SELECT * FROM taches WHERE utilisateur_id = $1", [userId], cb);
  },

  /**
   * Crée une nouvelle tâche pour un utilisateur.
   */
  create(titre, description, userId, cb) {
    db.query("INSERT INTO taches (titre, description, utilisateur_id) VALUES ($1, $2, $3)", [titre, description, userId], cb);
  },
  
   // Supprime une tâche appartenant à un utilisateur.
   
  delete(id, userId, cb) {
    db.query("DELETE FROM taches WHERE id = $1 AND utilisateur_id = $2", [id, userId], cb);
  },

  
    //Récupère une tâche avec ses sous-tâches.
   
  getById(taskId, userId, cb) {
    db.query("SELECT * FROM taches WHERE id = $1 AND utilisateur_id = $2", [taskId, userId], (err, results) => {
      if (err) return cb(err);
      if (results.length === 0) return cb(null, null);
      const task = results[0];
      db.query("SELECT * FROM sous_taches WHERE tache_id = $1", [taskId], (err, subtasks) => {
        if (err) return cb(err);
        task.subtasks = subtasks;
        cb(null, task);
      });
    });
  },

  
   // Met à jour le statut d'une tâche.
   
  updateStatus(taskId, userId, statut, cb) {
    db.query("UPDATE tasks SET statut = $1 WHERE id = $2 AND user_id = $3", [statut, taskId, userId], cb);
  },

  
   //Ajoute une sous-tâche à une tâche.
   
  addSubtask(taskId, titre, statut, cb) {
    db.query("INSERT INTO subtasks (task_id, titre, statut) VALUES ($1, $2, $3)", [taskId, titre, statut], cb);
  },

  
   // Met à jour le titre d'une sous-tâche.
   
  updateSubtask(id, titre, cb) {
    db.query("UPDATE subtasks SET titre = $1 WHERE id = $2", [titre, id], cb);
  },

  
   // Met à jour le statut d'une sous-tâche.
   
  updateSubtaskStatus(id, statut, cb) {
    db.query("UPDATE subtasks SET statut = $1 WHERE id = $2", [statut, id], cb);
  },

  
   // Supprime une sous-tâche.
   
  deleteSubtask(id, cb) {
    db.query("DELETE FROM subtasks WHERE id = $1", [id], cb);
  }
};

export default Task;
