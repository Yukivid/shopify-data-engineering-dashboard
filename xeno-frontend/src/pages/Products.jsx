import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ingest/products")
      .then(res => res.json())
      .then(data => {
        console.log("Products:", data.products);
        setProducts(data.products || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">
      <h2>Products</h2>
      <p>Products list fetched from Shopify.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Vendor</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.vendor}</td>
              <td>{p.variants?.[0]?.price || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
