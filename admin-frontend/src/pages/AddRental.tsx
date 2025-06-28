import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Car {
  id: number;
  plate_number: string;
  brand: string;
  model: string;
  daily_rate: number;
}

interface RentalForm {
  renter_name: string;
  contact_number: number;
  email: string;
  car: string;
  start_date: Date;
  end_date: Date;
}

const schema = yup
  .object()
  .shape({
    renter_name: yup.string().required("*"),
    contact_number: yup
      .number()
      .max(10000000000, "Enter a valid number")
      .required("*"),
    email: yup.string().email("Invalid email").required("*"),
    car: yup.string().required("*"),
    start_date: yup.date().required("*"),
    end_date: yup.date().required("*"),
  })
  .required();

const AddRental: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalForm>({
    resolver: yupResolver(schema),
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

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
        } else {
          console.log("Failed to retrieve cars");
        }
      } catch (error) {
        console.log("An error occured: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCarId || !startDate || !endDate) {
      setTotalPrice(0);
      return;
    }

    const car = cars.find((c) => c.id === Number(selectedCarId));
    if (!car) return;

    const sd = new Date(startDate);
    const ed = new Date(endDate);
    sd.setHours(0, 0, 0, 0);
    ed.setHours(0, 0, 0, 0);

    const diffMs = ed.getTime() - sd.getTime();
    const days = Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1, 0); // inclusive

    setTotalPrice(days * car.daily_rate);
  }, [selectedCarId, startDate, endDate, cars]);

  const onSubmit = async (data: RentalForm) => {
    const payload = {
      renter_name: data.renter_name,
      contact_number: data.contact_number,
      email: data.email,
      car_id: selectedCarId,
      start_date: data.start_date,
      end_date: data.end_date,
      initial_price: totalPrice,
    };

    try {
      const res = await fetch("http://localhost:3000/rentals/add-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        navigate("/rentals");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <section>
      {/* customer info and schedule*/}
      {currentStep === 1 && (
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center mt-5 text-gray-800"
        >
          <p className="text-sm text-gray-600 mt-1 mb-3">
            Fill out the details below to create a new rental.
          </p>

          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/4">Renter Name:</label>
              <input
                type="text"
                id="renter_name"
                {...register("renter_name")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="Jane Doe"
              />
            </div>
            {errors.renter_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.renter_name.message}
              </p>
            )}
          </div>
          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/4">Contact No:</label>
              <input
                type="text"
                id="contact_number"
                {...register("contact_number")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="09XX XXX XXXX"
              />
              {errors.contact_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact_number.message}
                </p>
              )}
            </div>
          </div>
          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/4">Email:</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="janedoe@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/4">Start Date:</label>
              <input
                type="date"
                id="start_date"
                {...register("start_date")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.start_date.message}
              </p>
            )}
            <div className="form-group w-[500px] mt-3">
              <div className="flex items-center">
                <label className="w-1/4">End Date:</label>
                <input
                  type="date"
                  id="end_date"
                  {...register("end_date")}
                  className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {errors.end_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.end_date.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-group w-[500px] mt-3 flex items-center gap-4">
            <Button
              buttonName="Next"
              type="button"
              buttonWidth="w-full"
              onClickFunction={handleNext}
            />
          </div>
        </form>
      )}

      {currentStep === 2 && (
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center mt-5 text-gray-800"
        >
          <p className="text-sm text-gray-600 mt-1 mb-3">
            Choose where to pickup and dropoff the rented vehicle.
          </p>

          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/3">Pickup Location:</label>
              <input
                type="text"
                id="renter_name"
                {...register("renter_name")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="123 Brgy. West Tapinac, Olongapo City"
              />
            </div>
            {errors.renter_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.renter_name.message}
              </p>
            )}
          </div>
          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/3">Dropoff Location:</label>
              <input
                type="text"
                id="contact_number"
                {...register("contact_number")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="321 Horizon Motors, Olongapo City"
              />
              {errors.contact_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact_number.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-group w-[500px] mt-10">
            <div className="flex items-center">
              <label className="w-1/3">Available Vehicles:</label>
              <select
                value={selectedCarId}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                {...register("car")}
                onChange={(e) =>
                  setSelectedCarId(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {`${car.plate_number} — ${car.brand} ${car.model}`}
                  </option>
                ))}
              </select>
            </div>
            {errors.car && (
              <p className="text-red-500 text-sm mt-1">{errors.car.message}</p>
            )}
          </div>

          <div className="form-group w-[500px] mt-3 flex items-center gap-4">
            <Button
              buttonName="Back"
              buttonWidth="w-1/2"
              fontColor="text-gray-800"
              buttonColor="none"
              buttonHoverColor="hover:bg-gray-300"
              border="border border-gray-400"
              onClickFunction={handlePrevious}
              type="button"
            />
            <Button
              buttonName="Next"
              buttonWidth="w-1/2"
              onClickFunction={handleNext}
            />
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center mt-5 text-gray-800"
        >
          <p className="text-sm text-gray-600 mt-1 mb-3">
            Choose the services you need.
          </p>

          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/3">Pickup Location:</label>
              <input
                type="text"
                id="renter_name"
                {...register("renter_name")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="123 Brgy. West Tapinac, Olongapo City"
              />
            </div>
            {errors.renter_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.renter_name.message}
              </p>
            )}
          </div>
          <div className="form-group w-[500px] mt-3">
            <div className="flex items-center">
              <label className="w-1/3">Dropoff Location:</label>
              <input
                type="text"
                id="contact_number"
                {...register("contact_number")}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                placeholder="321 Horizon Motors, Olongapo City"
              />
              {errors.contact_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact_number.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-group w-[500px] mt-10">
            <div className="flex items-center">
              <label className="w-1/3">Available Vehicles:</label>
              <select
                value={selectedCarId}
                className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
                {...register("car")}
                onChange={(e) =>
                  setSelectedCarId(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {`${car.plate_number} — ${car.brand} ${car.model}`}
                  </option>
                ))}
              </select>
            </div>
            {errors.car && (
              <p className="text-red-500 text-sm mt-1">{errors.car.message}</p>
            )}
          </div>

          <div className="form-group w-[500px] mt-3 flex items-center gap-4">
            <Button
              buttonName="Back"
              buttonWidth="w-1/2"
              fontColor="text-gray-800"
              buttonColor="none"
              buttonHoverColor="hover:bg-gray-300"
              border="border border-gray-400"
              onClickFunction={handlePrevious}
              type="button"
            />
            <Button
              buttonName="Next"
              buttonWidth="w-1/2"
              onClickFunction={handleNext}
            />
          </div>
        </form>
      )}
    </section>
  );
};

export default AddRental;
