import React, { useEffect, useState } from 'react'
import api from '../api';

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/products")
      .then(response => {
        const data = response.data;
        if (data.code === 1000 && Array.isArray(data.result)) {
          setProducts(data.result);
        } else {
          setError("Không có dữ liệu sản phẩm!");
        }
      })
      .catch(err => {
        console.error(err);
        setError("Lỗi khi tải dữ liệu: " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {products.map(p =>(
        <div key={p.productId}>
          <img src={`/images/${p.img}.jpg` || `/images/${p.img}.png`} alt="" />
          <h2>{p.name}</h2>
          <p>Giá: {p.price}</p>
          <p>Danh mục: {p.category}</p>
          <p>Trạng thái: {p.inStock ? "Còn hàng" : "Hết hàng"}</p>
          <p>Phổ Biến: {p.popular ? "Có" : "Không"}</p>
          <hr />
          </div>
      ))}
    </div>
  )
}

