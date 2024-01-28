import axios from "axios";
export async function fetchOrders() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}order/all`
    );
    console.log('orderss:', response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching orderss:", error);
  }
}
