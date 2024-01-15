import React from "react";
import { Routes, Route } from "react-router-dom";
import DashTable from "../components/DashTable/DashTable";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashTable/>}>
        {/* <Route index element={<Overview />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
