import React from "react";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignUpFormState {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPass: string;
}

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required("*"),
    lastname: yup.string().required("*"),
    username: yup.string().required("*"),
    email: yup.string().email("Invalid email").required("*"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number")
      .required("*"),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password"),
  })
  .required();

const CreateAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormState>({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data: SignUpFormState) => {
    try {
      const res = await fetch("http://localhost:3000/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_name: `${data.firstname} ${data.lastname}`,
          admin_username: data.username,
          admin_email: data.email,
          admin_password: data.password,
        }),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        return navigate("/");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log("An error occuured: ", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center  text-gray-900">
      <div className="card bg-gray-100 w-[600px]  shadow-xl rounded-lg p-7 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Create Admin</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center mt-5"
        >
          <div className="form-group w-full mt-3 flex gap-2">
            <input
              type="text"
              id="firstname"
              {...register("firstname")}
              className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="First Name"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
            <input
              type="text"
              id="lastname"
              {...register("lastname")}
              className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Last Name"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div className="form-group w-full mt-3">
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="form-group w-full mt-3">
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* pass */}
          <div className="form-group w-full mt-2 flex flex-col ">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-[23px] text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* confirm pass */}
          <div className="form-group w-full mt-2 flex flex-col mb-5">
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPass"
                {...register("confirmPass")}
                className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                  errors.confirmPass ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm Password"
              />

              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 top-[23px] text-gray-500"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.confirmPass && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPass.message}
              </p>
            )}
          </div>
          <Button buttonName="Create Account" />
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
