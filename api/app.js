import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// session middleweare
app.use(
  session({
    secret: process.env.SESSION_KEY, // replace with something secure
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);

export default app;
