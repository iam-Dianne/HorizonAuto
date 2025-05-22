import { FaSignOutAlt } from "react-icons/fa";
import { FaCar, FaFile, FaGear, FaHouse, FaUsers } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[300px] h-screen py-7 px-5 bg-gray-900 text-gray-200 flex flex-col">
      <div className="logo mb-10 flex justify-center">
        <img src="/public/BRANDING.png" alt="Logo" className="h-[80px]" />
      </div>
      <div className="content w-full flex flex-col flex-grow">
        <ul>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <FaHouse className="mr-3 items-center" size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <FaFile className="mr-3 items-center" size={18} />
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <FaCar className="mr-3 items-center" size={18} />
              <span>Cars</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <FaUsers className="mr-3 items-center" size={18} />
              <span>Customers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <MdOutlinePayment className="mr-3 items-center" size={18} />
              <span>Payments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
            >
              <IoStatsChart className="mr-3 items-center" size={18} />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
        <div className="bottom mt-auto">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
              >
                <FaGear className="mr-3 items-center" size={18} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center hover:bg-gray-800 rounded-lg py-2 px-3 transition duration-200"
              >
                <FaSignOutAlt
                  style={{ transform: "rotate(180deg)" }}
                  className="mr-3 items-center"
                  size={18}
                />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
