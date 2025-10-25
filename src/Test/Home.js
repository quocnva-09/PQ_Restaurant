import React from "react";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> Món ăn nổi bật</h1>
      <ProductList />
    </div>
  );
}