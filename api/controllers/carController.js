import pool from "../config/db.js";

// CREATE NEW CAR
export const createNewCar = async (req, res) => {
  try {
    const { plate_number, brand, model, type, year, daily_rate } = req.body;

    if (!plate_number || !brand || !model || !type || !year || !daily_rate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection: ", err);
        return res.status(500).send("Error connecting to database");
      }

      const sql = `
        INSERT INTO cars (plate_number, brand, model, type, year, daily_rate) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        sql,
        [plate_number, brand, model, type, year, daily_rate],
        (err, result) => {
          connection.release();

          if (err) {
            console.log("Database error: ", err);
            return res.status(500).json({
              success: false,
              message: "Error in creating new car profile",
            });
          }

          console.log("Car added successfully");
          return res
            .status(201)
            .json({ success: true, message: "Car created successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error in creating new car profile: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCars = (req, res) => {
  pool.query("SELECT * FROM cars", (err, rows) => {
    if (err) {
      console.log("Cannot retrieve data.");
      return res.status(500).json({
        success: false,
        message: "Could not retrieve cars",
      });
    }
    res.json({
      success: true,
      cars: rows,
    });
  });
};

export const deleteCar = (req, res) => {
  const carId = req.params.id;
  if (!carId) {
    return res
      .status(400)
      .json({ success: false, message: "Car ID is required" });
  }

  const sql = `DELETE FROM cars WHERE id = ?`;

  pool.query(sql, [carId], (err, result) => {
    if (err) {
      console.log("Error deleting car: ", err);
      return res.status(500).json({
        success: false,
        message: "Error deleting car",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    console.log("Car deleted successfully");
    return res
      .status(201)
      .json({ success: true, message: "Car deleted successfully" });
  });
};
