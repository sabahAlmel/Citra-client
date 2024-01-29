import { useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useApi = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiCall = async ({ url, method, data = null }) => {
        try {
            const response = await axiosInstance({
                url,
                method,
                data
            });
            return response.data;
        } catch (error) {
            console.error("API call error:", error);

            if (error.response) {
                const { status, data: responseData } = error.response;

                if (status === 401) {
                    toast.error(responseData.message || "Unauthorized");
                    setUser(null);
                    navigate('/login');
                } else if (status === 403) {
                    toast.error("Forbidden Access");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }

            throw error;
        }
    };

    return { apiCall };
};

export default useApi;
