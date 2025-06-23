import express from "express";
import { createNewCar, getCars } from "../controllers/carController.js";

const router = express.Router();

router.post("/add-car", createNewCar);
router.get("/", getCars);

export default router;
