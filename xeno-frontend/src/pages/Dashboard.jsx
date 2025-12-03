import React from "react";
import Chart from "react-apexcharts";
import "./Dashboard.css";

export default function Dashboard() {
  const stats = [
    { label: "Total Customers", value: 8 },
    { label: "Total Orders", value: 7 },
    { label: "Total Revenue", value: "₹10018.19" },
  ];

  return (
    <div className="dashboard-container">

      {/* Page Heading */}
      <h2 className="page-title">Dashboard</h2>

      {/* Stats Row */}
      <div className="stats-row">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <h3 className="stat-value">{s.value}</h3>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Line Chart */}
      <div className="chart-large">
        <Chart
          type="line"
          height={300}
          series={[
            {
              name: "Revenue",
              data: [40000, 48000, 52000, 61000],
            },
          ]}
          options={{
            chart: { toolbar: { show: false } },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
            stroke: { curve: "smooth", width: 3 },
            colors: ["#2F6FED"],
          }}
        />
      </div>

      {/* Two charts side by side */}
      <div className="chart-row">
        {/* Bar Chart */}
        <div className="chart-small">
          <Chart
            type="bar"
            height={280}
            series={[
              {
                name: "Orders",
                data: [5, 7, 9, 12],
              },
            ]}
            options={{
              xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
              colors: ["#34C759"],
            }}
          />
        </div>

        {/* Donut Chart */}
        <div className="chart-small">
          <Chart
            type="donut"
            height={280}
            series={[8, 7]}
            options={{
              labels: ["Customers", "Orders"],
              colors: ["#FF6B6B", "#28C76F"],
              legend: { position: "right" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
