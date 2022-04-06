import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import SearchResult from "./components/SearchResult";
import WishList from "./components/WishList";

import "./style/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<AppLayout />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/wishlist/:wishlistId" element={<WishList />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
