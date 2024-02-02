import React from 'react'
import ProductTable from '../../../components/DashTable/productTable/ProductTable'
import styles from "./Products.module.css"

function Products() {

  return (
    <div className={styles.container}>

      <ProductTable />
    
    </div>
 
  )
}

export default Products
