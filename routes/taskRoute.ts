import { Router } from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
  markTaskAsCompleted,
  getPendingTasks,
  // updateTaskState,
} from "../controllers/taskControllers";
const cors = require("cors");

const router = Router();

router.use(cors());

router.get("/", getTasks);
router.post("/", createTask);
router.get("/pending", getPendingTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/completed", markTaskAsCompleted);

export default router;
