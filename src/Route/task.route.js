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
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", deleteTask);
router.patch("/:id/statut", updateStatus);

// Sous-tâches
router.post("/:id/sous-taches", addSubtask);
router.put("/sous-taches/:subtaskId", updateSubtask);
router.patch("/sous-taches/:subtaskId/statut", updateSubtaskStatus);
router.delete("/sous-taches/:subtaskId", deleteSubtask);

export default router;
