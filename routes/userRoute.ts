import { Router } from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getUserByEmail,
} from "../controllers/userController";
const cors = require("cors");

const router = Router();

router.use(cors());

router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
