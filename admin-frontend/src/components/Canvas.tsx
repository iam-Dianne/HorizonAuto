import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Canvas: React.FC = () => {
  return (
    <div className="w-full bg-gray-200 ">
      <header className="bg-gray-100 py-4 px-6 flex justify-between items-center">
        <h1 className="2xl:text-3xl sm:text-xl font-bold text-gray-800">
          Dashboard
        </h1>
        <div className="flex items-center space-x-5">
          <FaBell className="text-gray-900" size={24} />
          <Link to={"/admin-profile"}>
            <FaCircleUser
              className="text-gray-900 hover:text-primary"
              size={24}
            />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Canvas;
