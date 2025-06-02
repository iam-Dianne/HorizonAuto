import express from "express";
import { createAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", createAdmin);

router.get("/test", (req, res) => {
  res.send("Admin route is working");
});

export default router;
