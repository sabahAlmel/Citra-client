import React from 'react'
import ProductTable from '../../../components/DashTable/productTable/ProductTable'
import styles from "./Products.module.css"
import { Helmet } from "react-helmet-async";


function Products() {

  return (
    <div className={styles.container}>
       <Helmet>
     <title>المنتجات</title>
      <meta name="description" content ="المنتجات"></meta>
      <link rel="canoncial"  href="/products"/>
    </Helmet>

      <ProductTable />
    
    </div>
 
  )
}

export default Products
