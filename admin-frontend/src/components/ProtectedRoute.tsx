import React, { type JSX } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();

        if (result.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }

        // setIsAuthenticated(result.success);
      } catch (error) {
        console.log("Authentication failed: ", error);
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
