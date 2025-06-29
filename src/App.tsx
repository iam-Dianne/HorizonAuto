import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import CreateAdmin from "./pages/CreateAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminProfile from "./pages/AdminProfile";

import ManageCars from "./pages/ManageCars";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import ManageRentals from "./pages/ManageRentals";
import AddRental from "./pages/AddRental";
import Services from "./pages/Services";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/create-admin" element={<CreateAdmin />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/cars" element={<ManageCars />} />
          <Route path="/cars/add-new" element={<AddCar />} />
          <Route path="/cars/edit/:id" element={<EditCar />} />
          <Route path="/rentals" element={<ManageRentals />} />
          <Route path="/rentals/add-new" element={<AddRental />} />
          <Route path="/services" element={<Services />} />
        </Route>
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
