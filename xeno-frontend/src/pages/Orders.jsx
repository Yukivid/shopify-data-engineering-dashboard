import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ingest/orders")
      .then(res => res.json())
      .then(data => {
        console.log("Orders:", data.orders);
        setOrders(data.orders || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">
      <h2>Orders</h2>
      <p>Orders retrieved from Shopify.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer?.first_name} {o.customer?.last_name}</td>
              <td>${o.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
