import express from "express";
import {
  getAll,
  create,
  deleteTask,
  getById,
  updateStatus,
  addSubtask,
  updateSubtask,
  updateSubtaskStatus,
  deleteSubtask
} from "../Controller/task.controller.js";

const router = express.Router();

// Tâches
router.get("/taches", getAll);
router.get("/taches/:id", getById);
router.post("/taches", create);
router.delete("/taches/:id", deleteTask);
router.patch("/taches/:id/statut", updateStatus);

// Sous-tâches
router.post("/taches/:id/sous-taches", addSubtask);
router.put("/sous-taches/:subtaskId", updateSubtask);
router.patch("/sous-taches/:subtaskId/statut", updateSubtaskStatus);
router.delete("/sous-taches/:subtaskId", deleteSubtask);

export default router;
