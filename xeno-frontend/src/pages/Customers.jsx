import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ingest/customers")
      .then(res => res.json())
      .then(data => {
        console.log("Customers:", data.customers);
        setCustomers(data.customers || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">
      <h2>Customers</h2>
      <p>All synced customers displayed below:</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.email}</td>
              <td>{c.total_spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
