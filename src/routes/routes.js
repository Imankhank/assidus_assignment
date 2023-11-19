import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../modules/login";
import Dashbooard from "../modules/dahboard";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../components/scroll-to-top";
const MainRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Dashbooard />} />
        </Routes>
        <ToastContainer limit={2} />
        <ScrollToTop />
      </Router>
    </>
  );
};

export default MainRoute;
