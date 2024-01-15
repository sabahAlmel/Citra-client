import React from "react";
import { Link } from "react-router-dom";
import image from "./image.png";
import style from "./Product.module.css";

function Product() {
  let products = {
    products: [
      {
        details: { color: "black", size: "xl", type: "men's wear" },
        _id: "65a3e1be15c60f6e0ccaca75",
        name: "product 2",
        price: 200,
        serialNumber: "1",
        images: [],
        subCategoryID: "65a1802af2a3f8191855d4eb",
        categoryID: "65a17e21f2a3f8191855d4e6",
        categoryName: "accessories",
        quantity: 10,
        createdAt: "2024-01-14T13:29:34.861Z",
        updatedAt: "2024-01-14T13:29:34.861Z",
        __v: 0,
      },
      {
        details: { color: "black", size: "xl", type: "men's wear" },
        _id: "65a4c1fafb506eb798ff2c34",
        name: "test the slug",
        price: 200,
        serialNumber: "1",
        images: [],
        subCategoryID: "65a1802af2a3f8191855d4eb",
        categoryID: "65a17e21f2a3f8191855d4e6",
        quantity: 10,
        createdAt: "2024-01-15T05:26:18.449Z",
        updatedAt: "2024-01-15T05:26:18.449Z",
        __v: 0,
      },
      {
        details: { color: "black", size: "xl", type: "men's wear" },
        _id: "65a4c218fb506eb798ff2c36",
        name: "test the slug 2",
        price: 200,
        serialNumber: "1",
        images: ["image-1705296408606.jpeg"],
        subCategoryID: "65a1802af2a3f8191855d4eb",
        categoryID: "65a17e21f2a3f8191855d4e6",
        quantity: 10,
        createdAt: "2024-01-15T05:26:48.610Z",
        updatedAt: "2024-01-15T05:26:48.610Z",
        __v: 0,
      },
      {
        details: { color: "black", size: "xl", type: "men's wear" },
        _id: "65a4c218fb506eb798ff2c36",
        name: "test the slug 2",
        price: 200,
        serialNumber: "1",
        images: ["image-1705296408606.jpeg"],
        subCategoryID: "65a1802af2a3f8191855d4eb",
        categoryID: "65a17e21f2a3f8191855d4e6",
        quantity: 10,
        createdAt: "2024-01-15T05:26:48.610Z",
        updatedAt: "2024-01-15T05:26:48.610Z",
        __v: 0,
      },
    ],
  };
  return (
    <section className={style.productSection}>
      {products.products.map((element) => (
        <section className={style.productHolder}>
          {/* <img src={element.images[0]} alt="product"/> */}
          <img src={image} alt="product" />
          <div className={style.details}>
            <div>
              <h4>{element.name}</h4>
              <p>${element.price}</p>
            </div>
            <Link to="/" className={style.linkToSingle}>
              المزيد
            </Link>
          </div>
        </section>
      ))}
    </section>
  );
}

export default Product;
