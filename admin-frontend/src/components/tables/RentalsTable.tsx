import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

interface Rental {
  id: number; // you use rental.id as key, so id must exist
  customer_name: string;
  contact_number: number;
  email: string;
  plate_number: string;
  brand: string;
  start_date: string; // better to keep as string if coming from API
  end_date: string;
  initial_price: number;
  status: string;
}

const RentalsTable = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
        console.log(result);

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
          <th className=" ">Renter Name</th>
          <th className=" ">Car</th>
          <th className=" ">Pickup Date</th>
          <th className=" ">Return Date</th>
          <th className=" ">Payment</th>
          <th className=" ">Status</th>
          <th className=" ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map((rental, index) => (
          <tr key={rental.id} className="border-b">
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
            <td className=" text-center capitalize">{rental.status}</td>
            <td className=" text-center"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RentalsTable;
