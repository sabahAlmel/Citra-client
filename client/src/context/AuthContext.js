import React, { createContext, useState, useEffect } from "react";
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const [checkUser, setCheckUser] = useState(false);
    const [loading, setLoading] = useState(true); 

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            setCheckUser(true);
            const response = await axiosInstance.post('/user/login');
            console.log(response.data);
            setUser(response.data.data);
        } catch (error) {
            console.error("Error fetching user data", error);
            setUser(null);
        } finally {
            setCheckUser(false);
            setLoading(false); 
        }
    };

    
    

    // Function to handle logout
    const logout = async () => {
        try {
            await axiosInstance.post("/user/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Provide the context value to the children
    return (
        <AuthContext.Provider
            value={{ user, setUser, checkUser, setCheckUser,fetchUserData, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


