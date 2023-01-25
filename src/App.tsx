import React from "react";
import "./scss/app.scss";
import HomeComponent from "./pages/Home";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import Carts from "./pages/Basket";
import AboutProduct from "./components/AboutProduct";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomeComponent />} />
        <Route path="carts" element={<Carts />} />
        <Route path="product/:id" element={<AboutProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
