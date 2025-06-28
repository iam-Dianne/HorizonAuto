import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmAlert from "../ConfirmAlert";
import { useNavigate } from "react-router-dom";

interface Car {
  id: number;
  plate_number: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  daily_rate: number;
  is_available: boolean;
}

const CarsTable = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const deleteCar = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        setCars((prev) => prev.filter((c) => c.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log("An error occured: ", error);
      setErrorMessage("An unexpected error occured. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCar(id);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (selectedCar !== null) {
      await deleteCar(selectedCar);
    }
  };

  const handleCancel = async () => {
    setShowConfirm(false);
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <table className="w-full text-gray-800">
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <thead>
        <tr className="bg-gray-300 border-b">
          <th className="p-1">#</th>
          <th>Plate Number</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Type</th>
          <th>Year</th>
          <th>Rate/day</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      {cars.map((car, index) => (
        <tbody key={car.id} className="border-b">
          <td className="p-1">{index + 1}</td>
          <td className="text-center">{car.plate_number}</td>
          <td className="text-center">{car.brand}</td>
          <td className="text-center">{car.model}</td>
          <td className="text-center">{car.type}</td>
          <td className="text-center">{car.year}</td>
          <td className="text-center">{car.daily_rate}/day</td>
          <td className="text-center bg-gray-300">
            {car.is_available ? "Available" : "Unavailable"}
          </td>
          <td className="text-center py-2 flex justify-center items-center gap-3">
            <button
              onClick={() => navigate(`/cars/edit/${car.id}`)}
              className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer "
            >
              <MdEdit size={21} />
            </button>
            {/* DELETE BUTTONNN */}
            <button
              onClick={() => handleDeleteClick(car.id)}
              className="p-2 rounded-lg bg-primary-light hover:bg-primary cursor-pointer"
            >
              <FaTrash size={20} />
            </button>

            {showConfirm && selectedCar === car.id && (
              <ConfirmAlert
                message="Are you sure you want to delete this vehicle? This action cannot be undone."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </td>
        </tbody>
      ))}
    </table>
  );
};

export default CarsTable;
