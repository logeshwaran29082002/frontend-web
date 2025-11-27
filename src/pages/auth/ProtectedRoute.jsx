import React, { useEffect, useState } from "react";
import API from "../../utils/interceptor";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    API.get("/api/profile")
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsValid(false);
      });

  }, []); // ✅ correct dependency for deploy build

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return isValid ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
