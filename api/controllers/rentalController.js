import pool from "../config/db.js";

export const createNewRental = (req, res) => {
  const {
    renter_name,
    contact_number,
    email,
    car_id,
    start_date,
    end_date,
    initial_price,
  } = req.body;

  if (
    !renter_name ||
    !contact_number ||
    !email ||
    !car_id ||
    !start_date ||
    !end_date ||
    initial_price == null
  ) {
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

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        console.error("Error starting transaction:", err);
        return res.status(500).json({
          success: false,
          message: "Error starting transaction",
        });
      }

      const insertCustomerSql = `
        INSERT INTO customers (customer_name, contact_number, email)
        VALUES (?, ?, ?)
      `;

      connection.query(
        insertCustomerSql,
        [renter_name, contact_number, email],
        (err, customerResult) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              console.error("Error inserting customer:", err);
              res.status(500).json({
                success: false,
                message: "Error creating customer",
              });
            });
          }

          const customerId = customerResult.insertId;

          const insertRentalSql = `
            INSERT INTO rentals 
              (car_id, customer_id, start_date, end_date, initial_price, status)
            VALUES (?, ?, ?, ?, ?, 'booked')
          `;

          connection.query(
            insertRentalSql,
            [car_id, customerId, start_date, end_date, initial_price],
            (err, rentalResult) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  console.error("Error inserting rental:", err);
                  res.status(500).json({
                    success: false,
                    message: "Error creating rental",
                  });
                });
              }

              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    console.error("Error committing transaction:", err);
                    res.status(500).json({
                      success: false,
                      message: "Error finalizing rental creation",
                    });
                  });
                }

                connection.release();

                res.status(201).json({
                  success: true,
                  message: "Rental created successfully!",
                  data: {
                    rentalId: rentalResult.insertId,
                    customerId,
                  },
                });
              });
            }
          );
        }
      );
    });
  });
};

export const getRentals = (req, res) => {
  const sql = `
      SELECT 
        rentals.id,
        customers.customer_name,
        customers.contact_number,
        customers.email,
        cars.plate_number,
        cars.brand,
        cars.model,
        rentals.start_date,
        rentals.end_date,
        rentals.initial_price,
        rentals.status
      FROM rentals
      JOIN customers ON rentals.customer_id = customers.id
      JOIN cars ON rentals.car_id = cars.id
    `;

  pool.query(sql, (err, rows) => {
    if (err) {
      console.error("Cannot retrieve rentals.", err);
      return res.status(500).json({
        success: false,
        message: "Could not retrieve rentals",
      });
    }
    res.json({
      success: true,
      rentals: rows,
    });
  });
};
