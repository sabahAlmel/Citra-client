import axios from "axios";
import { useState } from "react";

const UpdateProduct = ({ id }) => {
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND}product/getone/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <></>;
};

export default UpdateProduct;
