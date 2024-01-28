
import axios from "axios";

export async function fetchUsers() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}user/getall`);
    const users = response.data.map((user) => ({
      id: user._id,  // Assuming '_id' is the unique identifier from the backend
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phone: user.phone, 
      createdAt: user.createdAt,  
    }));
    return users;
  } catch (error) {
    console.error("Error fetching Users:", error);
  }
}

export async function editUsers(id, updatedUserData) {
  try {
    console.log('Sending request to:', `${process.env.REACT_APP_BACKEND}user/${id}`);
    console.log('Request data:', updatedUserData);

    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}user/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.error("Error editing User:", error);
    throw error; // Propagate the error to handle it in the calling code

  }
}


