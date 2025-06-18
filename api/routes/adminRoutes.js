import express from "express";
import {
  createAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", createAdmin);
router.post("/admin-login", loginAdmin);
router.post("/admin-logout", logoutAdmin);

// router.get("/test", (req, res) => {
//   res.send("Admin route is working");
// });

export default router;
