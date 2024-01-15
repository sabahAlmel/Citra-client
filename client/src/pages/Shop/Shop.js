import React from "react";
import Category from "../../components/Shop/Category";
import ShopSide from "../../components/Shop/ShopSide";
import Product from "../../components/Shop/Product";

function Shop() {
  return (
    <div>
      <ShopSide />
      <Category />
      <Product />
      {/* <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      /> */}
    </div>
  );
}

export default Shop;
