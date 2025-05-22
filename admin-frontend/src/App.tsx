import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout />}></Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
