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

  const fetchUserDataone = async (email, password) => {
    try {
      console.log("authcontext process");
      setCheckUser(true);
      const response = await axiosInstance.get(
        `http://localhost:5000/user/getone`,
        {
          email: email,
          password: password,
        }
      );
      console.log("fetchuserdata", response);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setCheckUser(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      await axiosInstance.get("/user/logout");
      setUser(null);
      toast.success("تم تسجيل الخروج");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        fetchUserData,
        logout,
        fetchUserDataone,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
