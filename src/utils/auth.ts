// src/utils/auth.ts
export const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Example: Check if auth token exists
  };
  