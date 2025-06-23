import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();
        setIsAuthenticated(result.success);
      } catch (error) {
        setIsAuthenticated(false);
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
