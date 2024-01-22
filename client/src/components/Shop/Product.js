import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Product.module.css";
import order from "../../assets/icons/order.svg";
import orderHover from "../../assets/icons/orderHover.svg";
import {
  fetchProducts,
  fetchProductsByCateg,
  fetchProductsBySubCateg,
  fetchProductsNumber,
} from "../../db/fetchProduct";
import { useQuery } from "react-query";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ShopContext } from "../../ShopContext/ShopContext";

function ShoppingBag() {
  const [hover, setHovered] = useState(false);
  const hoverHandler = () => {
    setHovered(!hover);
  };
  let cart = order;
  if (hover) {
    cart = orderHover;
  } else {
    cart = order;
  }
  return (
    <img
      src={cart}
      alt="order now"
      onMouseOver={hoverHandler}
      onMouseOut={hoverHandler}
      className={style.cart}
    />
  );
}

function Product() {
  const { selectedCategory, selectedSubCategory, setSelectedSubCategory } =
    useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchTotalProducts() {
      try {
        let totalProducts = await fetchProductsNumber();
        totalProducts = totalProducts.number;
        let total;
        if (totalProducts <= 10) {
          total = 1;
        } else {
          total = Math.ceil(totalProducts / 10);
        }

        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    }
    fetchTotalProducts();
  }, []);

  if (selectedCategory && selectedSubCategory) {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(
      ["products", currentPage],
      () => fetchProductsBySubCateg(selectedSubCategory.join(","), currentPage),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );
    products = products ? products : [];
  } else if (selectedCategory) {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(
      ["productsFilterCateg", currentPage],
      () => fetchProductsByCateg(selectedCategory, currentPage),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );
    products = products ? products : [];
  } else {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(["products", currentPage], () => fetchProducts(currentPage), {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });
    products = products ? products : [];
  }
  useEffect(() => {
    refetch();
    if (!selectedSubCategory || selectedSubCategory.length === 0) {
      setSelectedSubCategory(null);
    }
  }, [selectedCategory, selectedSubCategory]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (isLoadingProducts) {
    return <h2 className={style.loading}>loading...</h2>;
  }

  return (
    <>
      <section className={style.productSection}>
        {products.length == 0 ? (
          <h2 className={style.loading}>no products available</h2>
        ) : (
          products?.products.map((element) => (
            <NavLink
              to={`/singleProduct/${element.slug}`}
              className={style.productHolder}
              key={element._id}
            >
              <img
                src={
                  element.images
                    ? `${process.env.REACT_APP_BACKEND}${element.images[0]}`
                    : null
                }
                alt="product"
              />
              <div className={style.details}>
                <div>
                  <h4>{element.name}</h4>
                  <p>${element.price}</p>
                </div>
                <Link to="/" className={style.addToCart}>
                  <ShoppingBag />
                </Link>
              </div>
            </NavLink>
          ))
        )}
      </section>
      <div className={style.pagination}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
    </>
  );
}

export default Product;
