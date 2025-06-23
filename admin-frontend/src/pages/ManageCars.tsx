import React from "react";
import { Link } from "react-router-dom";
import CarsTable from "../components/tables/CarsTable";

const ManageCars = () => {
  return (
    <section>
      <div className="create flex justify-end mb-5">
        <Link
          to="/cars/add-new"
          className="bg-gray-300 hover:bg-gray-400 py-1 px-3 rounded-lg"
        >
          + New Car
        </Link>
      </div>
      <CarsTable />
    </section>
  );
};

export default ManageCars;
