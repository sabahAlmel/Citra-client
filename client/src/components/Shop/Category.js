import React from "react";
import style from "./Category.module.css";

function Category() {
  let allCategories = {
    categories: [
      {
        _id: "65a17e21f2a3f8191855d4e6",
        name: "accessories",
        __v: 0,
      },
      {
        _id: "65a1935e7be5c9797fe24c10",
        name: "kitchen stuffe",
        createdAt: "2024-01-12T19:30:38.422Z",
        updatedAt: "2024-01-12T19:30:38.422Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "testing category",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
    ],
  };
  return (
    <section className={style.container}>
      {allCategories.categories.map((ele) => (
        <section key={ele._id} className={style.subContainer}>
          <h3>{ele.name}</h3>
        </section>
      ))}
    </section>
  );
}

export default Category;
