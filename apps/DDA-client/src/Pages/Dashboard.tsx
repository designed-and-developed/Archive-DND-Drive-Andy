import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return <h1>Dashboard</h1>;
};

export default Dashboard;
