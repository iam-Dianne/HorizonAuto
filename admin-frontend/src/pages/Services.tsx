import React, { useState } from "react";
import Button from "../components/Button";
import ServicesTable from "../components/tables/ServicesTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface RegisterService {
  service: string;
  service_price: number;
}
const schema = yup
  .object()
  .shape({
    service: yup.string().required("*"),
    service_price: yup.string().required("*"),
  })
  .required();

const Services: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterService>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterService) => {
    try {
      const res = await fetch("http://localhost:3000/services/add-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: data.service,
          service_price: data.service_price,
        }),
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);

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
      setErrorMessage("An unexpected error occured. Please try again later.");
    }
  };

  return (
    <div className="text-gray-800">
      <p className="text-sm text-gray-600 mt-4 mb-3 text-center">
        Add a new service to offer.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center justify-center mt-5 mb-4 "
      >
        <div className="form-group w-[500px] mt-5">
          <div className="flex items-center">
            <label className="mr-3">Service:</label>
            <input
              type="text"
              id="service"
              {...register("service")}
              className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
              placeholder="ABC1234"
            />
          </div>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">
              {errors.service.message}
            </p>
          )}
        </div>
        <div className="form-group w-[300] mt-5">
          <div className="flex items-center">
            <label className="mr-3">Price:</label>
            <input
              type="text"
              id="service_price"
              {...register("service_price")}
              className="h-9 rounded-md px-3 bg-gray-100 w-3/4"
              placeholder="ABC1234"
            />
          </div>
          {errors.service_price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.service_price.message}
            </p>
          )}
        </div>
        <Button
          buttonName="Add Service"
          type="submit"
          buttonWidth="w-[180px]"
        />
      </form>
      <ServicesTable />
    </div>
  );
};

export default Services;
