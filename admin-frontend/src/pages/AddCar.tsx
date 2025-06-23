import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterCarState {
  plate_number: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  daily_rate: number;
}

const schema = yup
  .object()
  .shape({
    plate_number: yup
      .string()
      .matches(
        /^[A-Za-z]{3}\d{4}$/,
        "Plate number must be 3 letters followed by 4 digits"
      )
      .required("*"),
    brand: yup.string().required("*"),
    model: yup.string().required("*"),
    type: yup.string().required("*"),
    year: yup.number().max(2025, "Enter a valid year").required("*"),
    daily_rate: yup.number().min(1, "Invalid price").required("*"),
  })
  .required();

const AddCar: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCarState>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterCarState) => {
    try {
      const res = await fetch("http://localhost:3000/cars/add-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plate_number: data.plate_number,
          brand: data.brand,
          model: data.model,
          type: data.type,
          year: data.year,
          daily_rate: data.daily_rate,
        }),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        console.log(result.message);
        return navigate("/cars");
      } else {
        setErrorMessage(result.message);
        console.log(result.message);
      }
    } catch (error) {
      console.log("An error occured: ", error);
      setErrorMessage("An unexpected erorr occured. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center mt-5 text-gray-800"
    >
      <p className="text-sm text-gray-600 mt-1 mb-3">
        Fill out the details below to register a new vehicle.
      </p>
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <div className="form-group w-[500px] mt-3">
        <div className="flex items-center">
          <label className="w-1/4">Plate Number:</label>
          <input
            type="text"
            id="plate_number"
            {...register("plate_number")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="ABC1234"
          />
        </div>
        {errors.plate_number && (
          <p className="text-red-500 text-sm mt-1">
            {errors.plate_number.message}
          </p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3 ">
        <div className="flex items-center">
          <label className="w-1/4">Brand:</label>
          <input
            type="text"
            id="brand"
            {...register("brand")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="Toyota"
          />
        </div>
        {errors.brand && (
          <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3 ">
        <div className="flex items-center">
          <label className="w-1/4">Model:</label>
          <input
            type="text"
            id="model"
            {...register("model")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="Vios"
          />
        </div>
        {errors.model && (
          <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3 ">
        <div className="flex items-center">
          <label className="w-1/4">Type:</label>
          <input
            type="text"
            id="type"
            {...register("type")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="Sedan"
          />
        </div>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3 ">
        <div className=" flex items-center">
          <label className="w-1/4">Year:</label>
          <input
            type="text"
            id="year"
            {...register("year")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="2025"
          />
        </div>
        {errors.year && (
          <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3">
        <div className=" flex items-center">
          <label className="w-1/4">Daily Rate:</label>
          <input
            type="number"
            id="rate"
            {...register("daily_rate")}
            className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
            placeholder="Php xxx.xx"
          />
        </div>
        {errors.daily_rate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.daily_rate.message}
          </p>
        )}
      </div>
      <div className="form-group w-[500px] mt-3 flex items-center gap-4">
        <Button buttonName="Add Car" type="submit" buttonWidth="w-1/2" />
        <Button
          buttonName="Cancel"
          buttonWidth="w-1/2"
          fontColor="text-gray-800"
          buttonColor="none"
          buttonHoverColor="hover:bg-gray-300"
          border="border border-gray-400"
          onClickFunction={() => {
            navigate("/cars");
          }}
          type="button"
        />
      </div>
    </form>
  );
};

export default AddCar;
