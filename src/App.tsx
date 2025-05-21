import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<AdminLayout />}></Route>)
  );
  return <RouterProvider router={router} />;
};

export default App;
