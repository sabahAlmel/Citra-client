import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(true);
  const [loading, setLoading] = useState(true);

  //   Fetch user data

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.get("/user/getone");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
    } finally {
      setCheckUser(false);
      setLoading(false); // Set loading to false when the operation is done
    }
  };

  // logout
  const logout = async () => {
    try {
      await axiosInstance.get("/user/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, checkUser, fetchUserData, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
