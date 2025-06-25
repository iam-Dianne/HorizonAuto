import express from "express";
import {
  createNewRental,
  getRentals,
} from "../controllers/rentalController.js";

const router = express.Router();

router.post("/add-rental", createNewRental);
router.get("/", getRentals);

export default router;
