import React from 'react'
import DashTable from '../../../components/DashTable/userTable/DashTable'
import styless from "./Users.module.css"
// import styles from "../Products/Products.module.css"

function Users() {
  return (
    <div className={styless.container}>
      <DashTable/>
    </div>
  )
}

export default Users
