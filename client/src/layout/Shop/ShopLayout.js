import React from "react";
import ShopSide from "../../components/Shop/ShopSide";
import Product from "../../components/Shop/Product";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import style from "./ShopLayout.module.css";

function ShopLayout() {
  return (
    <section>
      <ShopSide />
      <Product />
      <div className={style.pagination}>
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
    </section>
  );
}

export default ShopLayout;
