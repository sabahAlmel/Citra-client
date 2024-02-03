import axios from "axios";
export async function fetchProducts(nb) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/all-data`
    );
    console.log("data product",response.data)
    console.log("categ from product",response.data.categoryID)

    return response.data;
  } catch (error) {
    console.error("Error fetching Products:", error);
  }
}
export async function fetchProductsByCateg(categId, nb) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/bycategory/${categId}?page=${nb}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching By categories:", error);
  }
}

export async function fetchProductsBySubCateg(subCategId, nb) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/bysubcategory/${subCategId}?page=${nb}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching By Subcategories:", error);
  }
}
export async function fetchOneProduct(slug) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/getOne/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching one product:", error);
  }
}
export async function fetchProductsNumber() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/getNumber`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching number of product:", error);
  }
}

export async function searchProduct(nb, data) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}product/search?page=${nb}`,
      { search: data }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Products:", error);
  }
}

export async function fetchEight() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}product/getLastEight`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Products:", error);
  }
}
