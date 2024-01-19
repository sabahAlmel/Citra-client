import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';


export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null)
    const [checkUser , setCheckUser] = useState(false)
    const [loading , setLoading] = useState(true);


 //Fetch user data

 const fetchUserData = async() =>{
    try {
        setCheckUser(true);
        const response = await axiosInstance.post('/user/login')
        console.log(response.data);
        setUser(response.data.data)
    }catch{
        setCheckUser(false);
        setLoading(false);
    }
 };

 useEffect(() => {
    if (!user) {
        fetchUserData();
    } else {
        console.log("loggedin");
    }
}, [user]);


// logout
const logout = async () =>{
    try {
        await axiosInstance.post("/user/logout");
        setUser(null);
    } catch (error) {
        console.error("Logout error:", error);
    }
};

return (
    <AuthContext.Provider value={{user , setUser , checkUser, fetchUserData, logout, loading}}>
        {children}
    </AuthContext.Provider>
);
};

