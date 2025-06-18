import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./layouts/AdminLayout";
import CreateAdmin from "./pages/CreateAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminProfile from "./pages/AdminProfile";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/create-admin" element={<CreateAdmin />} />

        <Route path="/" element={<AdminLayout />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
