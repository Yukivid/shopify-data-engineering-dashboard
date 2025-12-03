import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Xeno App</h2>

      <div className="sidebar-section">
        <p className="section-label">MAIN</p>
        <NavLink to="/" className="sidebar-link">Dashboard</NavLink>
      </div>

      <div className="sidebar-section">
        <p className="section-label">DATA</p>
        <NavLink to="/customers" className="sidebar-link">Customers</NavLink>
        <NavLink to="/products" className="sidebar-link">Products</NavLink>
        <NavLink to="/orders" className="sidebar-link">Orders</NavLink>
      </div>
    </div>
  );
}
