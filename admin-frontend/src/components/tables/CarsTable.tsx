import { useEffect, useState } from "react";
import Spinner from "../Spinner";

interface Car {
  id: number;
  plate_number: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  daily_rate: number;
}

const CarsTable = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/cars", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result = await res.json();

        if (result.success) {
          setCars(result.cars);
          setIsLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to retrieve cars.");
          setIsLoading(false);
        }
      } catch (error) {
        console.log("An error occured: ", error);
        setErrorMessage("An unexpected error occured. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <table className="w-full">
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <thead>
        <tr className="bg-gray-300 border-b">
          <th className="p-1">#</th>
          <th className="w-1/6">Plate Number</th>
          <th className="w-1/6">Brand</th>
          <th className="w-1/6">Model</th>
          <th className="w-1/6">Type</th>
          <th className="w-1/6">Year</th>
          <th className="w-1/6">Rate/day</th>
        </tr>
      </thead>
      {cars.map((car, index) => (
        <tbody key={car.id} className="border-b">
          <td className="p-1">{index + 1}</td>
          <td className="w-1/6 text-center">{car.plate_number}</td>
          <td className="w-1/6 text-center">{car.brand}</td>
          <td className="w-1/6 text-center">{car.model}</td>
          <td className="w-1/6 text-center">{car.type}</td>
          <td className="w-1/6 text-center">{car.year}</td>
          <td className="w-1/6 text-center">{car.daily_rate}/day</td>
        </tbody>
      ))}
    </table>
  );
};

export default CarsTable;
