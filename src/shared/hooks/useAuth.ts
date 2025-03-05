import { useState, useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

const backendURL = "http://localhost:3000"; // Change for production

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);

      // Ensure the profile image has the full URL
      const imageUrl = parsedUser.profile_image_url.startsWith("/")
        ? `${backendURL}${parsedUser.profile_image_url}`
        : parsedUser.profile_image_url;

      setProfileImage(imageUrl);
      localStorage.setItem("profile_image_url", imageUrl);
    }
  }, []);

  
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("profile_image_url");
    setUser(null);
    setProfileImage(null);
  };

  // New method to check if user is logged in
  const isLoggedIn = () => {
    // Check both user state and token in localStorage
    return !!user && !!localStorage.getItem("token");
  };

  return { user, profileImage, logout, isLoggedIn };
};

export default useAuth;
