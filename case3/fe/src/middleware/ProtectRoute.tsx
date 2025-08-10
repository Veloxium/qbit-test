import { Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("/login");
    return null;
  }
  return <Outlet />;
};

export default ProtectRoute;
