import express from "express";
import {
  createNewCar,
  deleteCar,
  getCars,
} from "../controllers/carController.js";

const router = express.Router();

router.post("/add-car", createNewCar);
router.get("/", getCars);
router.delete("/:id", deleteCar);

export default router;
