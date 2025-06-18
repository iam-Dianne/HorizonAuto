import Button from "../components/Button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormState {
  admin_username: string;
  admin_password: string;
}

const schema = yup.object().shape({
  admin_username: yup.string().required("*"),
  admin_password: yup.string().required("*"),
});

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormState>({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormState) => {
    try {
      const res = await fetch("http://localhost:3000/admin/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        return navigate("/");
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
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center  text-gray-900">
      <div className="card bg-gray-100 w-[480px]  shadow-xl rounded-lg p-7 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Admin Log in</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center mt-5"
        >
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <div className="form-group w-full mt-3 flex flex-col">
            <input
              type="text"
              id="admin_username"
              {...register("admin_username")}
              className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                errors.admin_username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Username"
            />
            {errors.admin_username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.admin_username.message}
              </p>
            )}
          </div>
          <div className="form-group w-full mt-2 flex flex-col ">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("admin_password")}
                className={`w-full h-[50px] border rounded-lg px-3 mt-2 ${
                  errors.admin_password ? "border-red-500" : "border-gray-300"
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
            {errors.admin_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.admin_password.message}
              </p>
            )}
          </div>
          <Button buttonName="Log in" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
