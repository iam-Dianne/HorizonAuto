import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

interface Rental {
  rental_uuid: string; // you use rental.id as key, so id must exist
  customer_name: string;
  contact_number: number;
  email: string;
  plate_number: string;
  brand: string;
  start_date: string;
  end_date: string;
  initial_price: number;
  status: string;
}

const RentalsTable = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("Booked");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/rentals", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result = await res.json();
        console.log(result.data);

        if (result.success) {
          setRentals(result.rentals);
        } else {
          setErrorMessage(result.message || "Failed to retrieve rentals.");
        }
      } catch (error) {
        console.log("An error occurred: ", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateRentalStatus = async (rentalId: string, newStatus: string) => {
    try {
      const res = await fetch("http://localhost:3000/rentals/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          rental_id: rentalId,
          status: newStatus,
        }),
      });

      const result = await res.json();
      console.log(rentals);

      if (result.success) {
        console.log(`Updated status for reservation ${rentalId}`);
        setRentals((prev) =>
          prev.map((r) =>
            r.rental_uuid === rentalId ? { ...r, status: newStatus } : r
          )
        );
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (isLoading) {
    return <Spinner />; // Added return here to actually render Spinner
  }

  if (errorMessage) {
    return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
  }

  return (
    <table className="w-full text-gray-800 ">
      <thead>
        <tr className="bg-gray-300 border-b">
          <th className="p-1  ">#</th>
          <th>Renter Name</th>
          <th>Car</th>
          <th>Pickup Date</th>
          <th>Return Date</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map((rental, index) => (
          <tr key={rental.rental_uuid} className="border-b">
            <td className="p-1  ">{index + 1}</td>
            <td className="text-center ">{rental.customer_name}</td>
            <td className=" text-center">{`${rental.brand} (${rental.plate_number})`}</td>
            <td className="text-center ">
              {new Date(rental.start_date).toLocaleDateString()}
            </td>
            <td className="text-center">
              {new Date(rental.end_date).toLocaleDateString()}
            </td>
            <td className=" text-center">{rental.initial_price.toFixed(2)}</td>
            <td className=" text-center capitalize">
              <select
                name="status"
                value={rental.status}
                onChange={(e) =>
                  updateRentalStatus(rental.rental_uuid, e.target.value)
                }
              >
                <option value="Booked">Booked</option>
                <option value="Active">Active</option>
                <option value="Returned">Returned</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
            <td className=" text-center py-2 flex justify-center items-center">
              <button
                type="button"
                className="px-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer "
              >
                <BsThreeDots size={21} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RentalsTable;
