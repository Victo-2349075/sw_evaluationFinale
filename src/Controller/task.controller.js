// src/controllers/task.controller.js
import Task from "../Model/task.models.js";


//Récupère toutes les tâches de l'utilisateur connecté (en utilisant req.userId) et les retourne en format JSON.
export function getAll(req, res) {
  Task.getAll(req.userId, (err, tasks) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(tasks);
  });
}
//Crée une nouvelle tâche avec un titre et une description pour l'utilisateur connecté. Retourne l'identifiant de la nouvelle tâche.
export function create(req, res) {
  const { titre, description } = req.body;
  Task.create(titre, description, req.userId, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.status(201).json({ message: "Tâche créée", id: result.rows[0].id });
  });
}
//Supprime une tâche spécifique (via req.params.id) appartenant à l'utilisateur connecté. Retourne une erreur si la tâche n'existe pas.
export function deleteTask(req, res) {
  const taskId = req.params.id;
  Task.delete(taskId, req.userId, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (result.rowCount === 0) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  });
}
//Récupère une tâche précise par son identifiant (req.params.id) pour l'utilisateur connecté. Retourne une erreur si la tâche n'est pas trouvée.
export function getById(req, res) {
  const taskId = req.params.id;
  Task.getById(taskId, req.userId, (err, task) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(task);
  });
}
//Met à jour le statut (par exemple, "à faire", "en cours", "terminée") d'une tâche appartenant à l'utilisateur connecté. Retourne une erreur si la tâche n'existe pas.
export function updateStatus(req, res) {
  const { statut } = req.body;
  const taskId = req.params.id;
  Task.updateStatus(taskId, req.userId, statut, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (result.rowCount === 0) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Statut mis à jour" });
  });
}
//Ajoute une sous-tâche à une tâche existante (identifiée par req.params.id), avec un titre et un statut. Retourne l'identifiant de la nouvelle sous-tâche.
export function addSubtask(req, res) {
  const { titre, statut } = req.body;
  Task.addSubtask(req.params.id, titre, statut, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.status(201).json({ message: "Sous-tâche ajoutée", id: result.rows[0].id });
  });
}
//Modifie le titre d'une sous-tâche spécifique (via req.params.subtaskId). Ne vérifie pas l'utilisateur dans ce contrôleur.
export function updateSubtask(req, res) {
  const { titre } = req.body;
  Task.updateSubtask(req.params.subtaskId, titre, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ message: "Sous-tâche modifiée" });
  });
}
//Met à jour le statut d'une sous-tâche spécifique (via req.params.subtaskId). Ne vérifie pas l'utilisateur dans ce contrôleur.
export function updateSubtaskStatus(req, res) {
  const { statut } = req.body;
  Task.updateSubtaskStatus(req.params.subtaskId, statut, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ message: "Statut de la sous-tâche mis à jour" });
  });
}
//Supprime une sous-tâche spécifique (via req.params.subtaskId). Ne vérifie pas l'utilisateur dans ce contrôleur.
export function deleteSubtask(req, res) {
  Task.deleteSubtask(req.params.subtaskId, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ message: "Sous-tâche supprimée" });
  });
}





