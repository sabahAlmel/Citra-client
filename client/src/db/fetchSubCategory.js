import axios from "axios";
export async function fetchAllSubCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}subCategory/getall`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
  }
}
