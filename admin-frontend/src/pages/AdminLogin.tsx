import Button from "../components/Button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center  text-gray-900">
      <div className="card bg-gray-100 w-[480px]  shadow-xl rounded-lg p-7 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Admin Log in</h1>
        <form action="" className="w-full flex flex-col items-center mt-5">
          <div className="form-group w-full mt-3">
            <input
              type="email"
              id="email"
              className="w-full h-[50px] border border-gray-300 rounded-lg px-3 mt-2"
              placeholder="Email address"
            />
          </div>
          <div className="form-group w-full mt-2 relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full h-[50px] border border-gray-300 rounded-lg px-3 mt-2"
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
          <Button buttonName="Log in" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
