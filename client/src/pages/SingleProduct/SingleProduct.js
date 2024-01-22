import React from "react";
import style from "./SingleProduct.module.css";
import ProductImages from "../../components/SingleProduct/ProductImages";
import Content from "../../components/SingleProduct/Content";
import { fetchOneProduct } from "../../db/fetchProduct";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

function SingleProduct() {
  const { slug } = useParams();
  const { isLoading, data: products } = useQuery(
    "single-product",
    () => fetchOneProduct(slug),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  return (
    <section className={style.handle}>
      <ProductImages products={products} isLoading={isLoading} />
      <Content products={products} isLoading={isLoading} />
    </section>
  );
}

export default SingleProduct;
