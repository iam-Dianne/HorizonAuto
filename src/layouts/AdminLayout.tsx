import Canvas from "../components/Canvas";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default AdminLayout;
