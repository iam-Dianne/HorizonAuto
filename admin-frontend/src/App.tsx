import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminProfile from "./pages/AdminProfile";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
