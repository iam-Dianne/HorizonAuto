import React from "react";
import { Link } from "react-router-dom";
import RentalsTable from "../components/tables/RentalsTable";

const ManageRentals = () => {
  return (
    <section>
      <div className="create flex justify-end mb-5 text-gray-800">
        <Link
          to="/rentals/add-new"
          className="bg-gray-300 hover:bg-gray-400 py-1 px-3 rounded-lg"
        >
          + New Rental
        </Link>
      </div>
      <RentalsTable />
    </section>
  );
};

export default ManageRentals;
