import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [loading, setLoading] = useState(true);

  //Fetch user data

  const fetchUserData = async (email, password) => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      console.log("response from fetchUser function", response);
      console.log("fetch user data ", response.data);
      setUser(response.data.token.data);
      console.log("user auth:", user);
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
    } finally {
      setCheckUser(false);
      setLoading(false); // Set loading to false when the operation is done
    }
  };

  const fetchUserDataone = async () => {
    try {
      console.log("authcontext process");
      setCheckUser(true);
      const response = await axiosInstance.get(
        `http://localhost:5000/user/getone`,
        {
          withCredentials: true,
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
    fetchUserDataone();
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
