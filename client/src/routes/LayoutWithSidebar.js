import React from "react";
import styles from "./Layout.module.css";
import Sidebar from "../layout/SideBar/SideBar";
function LayoutWithSidebar({ children }) {
  return (
    <>
      <div
        className={styles.containers}
        style={{
          minHeight: "8vh",
          margin: "0%",
          display: "grid",
          gridTemplateColumns: " auto 1fr",
          columnGap: "0%",
        }}
      >
        {" "}
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default LayoutWithSidebar;
