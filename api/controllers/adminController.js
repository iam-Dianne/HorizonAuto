import pool from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { encryptId } from "../utils/encryptedId.js";

export const createAdmin = async (req, res) => {
  try {
    const { admin_name, admin_username, admin_email, admin_password } =
      req.body;

    if (!admin_name || !admin_username || !admin_email || !admin_password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(admin_password, 10);
    const rawId = crypto.randomUUID();
    const encryptedId = encryptId(rawId);

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection:", err);
        return res.status(500).send("Error connecting to database");
      }

      const sql = `
    INSERT INTO admins ( id, admin_name, admin_username, admin_email, admin_password ) 
    VALUES ( ?, ?, ?, ?, ? )
    `;

      connection.query(
        sql,
        [encryptedId, admin_name, admin_username, admin_email, hashedPassword],
        (err, result) => {
          connection.release();

          if (err) {
            console.log("Database error: ", err);
            return res.status(500).json({
              success: false,
              message: "Database error:, ",
              error: err,
            });
          }

          console.log("Admin added successfully");
          return res
            .status(201)
            .json({ success: true, message: "Admin created successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error in creating admin: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
