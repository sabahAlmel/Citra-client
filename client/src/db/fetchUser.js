
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
      createdAt: user.createdAt,  // Assuming 'createdAt' is the timestamp from the backend
    }));
    return users;
  } catch (error) {
    console.error("Error fetching Users:", error);
  }
}

// export async function editUsers() {
//   try {
//     const response = await axios.patch(`${process.env.REACT_APP_BACKEND}user/:id`);
//     const users = response.data.map((user) => ({
//       id: user._id,  // Assuming '_id' is the unique identifier from the backend
//       name: user.name,
//       email: user.email,
//       password: user.password,
//       role: user.role,
//       createdAt: user.createdAt,  // Assuming 'createdAt' is the timestamp from the backend
//     }));
//     return users;
//   } catch (error) {
//     console.error("Error fetching Users:", error);
//   }
// }
