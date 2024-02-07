import React from "react";
import styles from "./Category.module.css";
import CategoryTable from "../../../components/DashTable/Category/CategoryTable";
function Category() {
  return (
    <div className={styles.container}>
      <CategoryTable />
    </div>
  );
}

export default Category;
