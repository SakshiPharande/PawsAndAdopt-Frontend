// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />; // Redirect to SignIn if not authenticated
  }

  return children;
};

export default ProtectedRoute;
