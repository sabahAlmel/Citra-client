import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [loading, setLoading] = useState(true);

  //Fetch user data

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.post("/user/login");
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
      await axiosInstance.post("/user/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        fetchUserData,
        fetchUserDataone,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
