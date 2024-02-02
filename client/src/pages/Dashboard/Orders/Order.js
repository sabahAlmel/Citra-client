import React from 'react'
import OrderTable from "../../../components/DashTable/orderTable/OrderTabel"
import styles from "./Order.module.css"
function Order() {
  return (
    <div className={styles.container}>
      <OrderTable/>
    </div>
  )
}

export default Order
