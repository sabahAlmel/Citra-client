import axios from "axios";
export async function fetchAllCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}category/getall`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
