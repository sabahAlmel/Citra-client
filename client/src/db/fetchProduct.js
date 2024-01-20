import axios from "axios";
export async function fetchProducts(nb) {
  return axios.get(`${process.env.REACT_APP_BACKEND}product/getall?page=${nb}`);
}
