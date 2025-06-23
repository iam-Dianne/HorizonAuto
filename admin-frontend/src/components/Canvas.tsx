import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";

const Canvas: React.FC = () => {
  const location = useLocation();

  const pageTitles = new Map<string, string>([
    ["/", "Dashboard"],
    ["/cars", "Manage Cars"],
    ["/cars/add-new", "Add New Car"],
  ]);

  const title = pageTitles.get(location.pathname) ?? "Page";

  return (
    <div className="w-full bg-gray-200 ">
      <header className="bg-gray-100 py-4 px-6 flex justify-between items-center">
        <h1 className="2xl:text-3xl sm:text-xl font-bold text-gray-800">
          {title}
        </h1>
        <div className="flex items-center space-x-5">
          <FaBell className="text-gray-900" size={24} />
          <Link to={"/admin-profile"}>
            <FaCircleUser className="text-gray-900 " size={24} />
          </Link>
        </div>
      </header>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Canvas;
