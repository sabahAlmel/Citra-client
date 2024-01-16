import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/icons/logo.svg"
import magnifire from "../../assets/icons/search.png"
import order from "../../assets/icons/order.svg"
import styles from "./NavBar.module.css"

function NavBar() {
  const [searchInput,setSearchInput]=useState("")
    // Handles changes in the search input.
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
    };
    const handleSearch = () => {
      // Add your search functionality here
      console.log("Search for:", searchInput);
      // You may want to perform the actual search logic here
    };
  return (
  <header>
    <nav className=
    {styles.nav}>
      <img className={styles.logo} src={logo} alt="citra's logo "/>
      <ul>
        <li><Link className={styles.link} to="./">الصفحة الرئيسية</Link> </li>
        <li><Link className={styles.link}to="./"> منتجاتنا </Link> </li>
        <li> <Link className={styles.link} to="./card">إطلب الآن</Link></li>
        <li><Link className={styles.link}to="./aboutus">حولنا</Link>   </li>
      </ul>
      <form>
        <input id='search' type='text' placeholder='إبحث عن إسم المنتج' value={searchInput} onChange={handleSearchInputChange} ></input>
        <img className={styles.magnifire}src={magnifire} alt='magnifire' onClick={handleSearch} />
      </form>
      <Link className={styles.link} to="./signin"> تسجيل دخول</Link>
      <Link className={styles.link} to="./signup">اشتراك</Link>
      <img src={order} alt='bag'/>
    </nav>
  </header>
  )
}

export default NavBar
