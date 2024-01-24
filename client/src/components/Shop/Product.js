import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Product.module.css";
import { motion } from "framer-motion";
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
import { toast } from "react-toastify";
import ShopSide from "./ShopSide";

function Product() {
  const { selectedCategory, selectedSubCategory, setSelectedSubCategory } =
    useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAbove769px, setIsAbove769px] = useState(window.innerWidth > 769);
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
  useEffect(() => {
    fetchTotalProducts();
    function handleResize() {
      setIsAbove769px(window.innerWidth > 769);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const handleClick = (product) => {
    const { name, price, images, details } = product;
    const selectedColor =
      details[0].color && details[0].color.length > 0 ? details[0].color : null;
    const selectedSize =
      details[0].sizes[0].size && details[0].sizes[0].size.length > 0
        ? details[0].sizes[0].size
        : null;

    const initialQuantity = 1;

    const productInfo = {
      name,
      price,
      totalPrice: price * initialQuantity,
      image: images && images.length > 0 ? images[0] : null,
      selectedColor,
      selectedSize,
      quantity: initialQuantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) =>
        item.name === productInfo.name &&
        item.selectedColor === productInfo.selectedColor &&
        item.selectedSize === productInfo.selectedSize
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += initialQuantity;
      existingCart[existingProductIndex].totalPrice += productInfo.totalPrice;
    } else {
      existingCart.push(productInfo);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("تمت اضافة المنتج");
  };

  if (isLoadingProducts) {
    return <h2 className={style.loading}>loading...</h2>;
  }

  return (
    <article className={isAbove769px ? style.collapse : ""}>
      <ShopSide />
      <motion.section
        className={isAbove769px ? style.shopContainer : ""}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeIn",
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
      >
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
                  <Link
                    className={style.addToCart}
                    onClick={() => handleClick(element)}
                  >
                    اضف الآن
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
      </motion.section>
    </article>
  );
}

export default Product;
