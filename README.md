# **Xeno FDE Shopify Integration – 2025**

This project is a complete full-stack system built for the **Xeno FDE Internship Assignment – 2025**.

It integrates with the **Shopify Admin API**, ingests Customers / Products / Orders, stores them in a database, and visualizes business analytics in a **React Dashboard** with charts, metrics, and tables.

---

# 🚀 **Tech Stack Overview**

### **Backend**

* Node.js + Express
* Prisma ORM
* SQLite Database
* Axios (Shopify API)
* Cron Jobs (Auto Sync)
* Environment-based tenant authentication

### **Frontend**

* React (Vite)
* ApexCharts
* Custom CSS
* Reusable Components
* Analytics Dashboard

---

# ✅ **Features Implemented**

## **Phase 1 — Backend System**

*✔ Shopify Admin API Integration
*✔ Fetch Customers / Products / Orders
*✔ Save to DB using Prisma
*✔ Upsert logic → prevents duplicates
*✔ Auto-Sync every 1 hour (Cron job)
*✔ Tenant Registration API
*✔ Modular route structure
*✔ Error handling + logging

---

## **Phase 2 — Frontend Dashboard**

*✔ Responsive Admin Dashboard
*✔ Sidebar Navigation
*✔ Animated KPI Cards
*✔ ApexCharts Graphs
*✔ Customer Table with Search
*✔ Manual “Sync Now” button
*✔ Clean modern UI (bold fonts, spacing, layout)
*✔ Zero-scroll perfect layout

---

# 📁 **Project Structure**

```
xeno/
│
├── xeno-backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── routes/
│       ├── ingestRoutes.js
│       └── tenant.js
│
└── xeno-frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Table.jsx
    │   │   └── *.css
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Customers.jsx
    │   │   ├── Orders.jsx
    │   │   └── Products.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
```

---

# 🔧 **Backend Setup Instructions**

### **1. Install dependencies**

```bash
cd xeno-backend
npm install
```

### **2. Configure .env**

Create a `.env` file:

```
SHOPIFY_STORE_URL=yourshop.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxx
PORT=4000
```

### **3. Setup Prisma database**

```bash
npx prisma migrate dev --name init
```

### **4. Start the backend**

```bash
npm run dev
```

Backend will run at:
**[http://localhost:4000](http://localhost:4000)**

---

# 🛠 API Routes Overview

### **Tenant Registration**

```
POST /tenant/register
```

### **Fetch Shopify data**

```
GET /ingest/customers
GET /ingest/products
GET /ingest/orders
```

### **Save to DB**

```
GET /ingest/save/customers
GET /ingest/save/products
GET /ingest/save/orders
```

### **Cron Auto-Sync**

Runs every 1 hour automatically.

---

# 🎨 **Frontend Setup Instructions**

### **1. Install dependencies**

```bash
cd xeno-frontend
npm install
```

### **2. Run frontend**

```bash
npm run dev
```

Frontend runs at:
**[http://localhost:5173](http://localhost:5173)**

---

# 📊 **Dashboard Features**

### **KPIs (Metrics)**

* Total Customers
* Total Orders
* Total Revenue
* Active Customers

### **Charts (ApexCharts)**

* Revenue Trend Line Chart
* Orders per Day Bar Chart
* Top 5 Customers Pie Chart
* Category-wise Product Distribution

### **Customer Table**

* Search
* Sorting
* Refresh Button
* Pagination (optional)

---

# 🔁 **Auto Sync System**

A cron job runs every 1 hour:

```
⏳ Auto-Sync started...
Fetching Shopify → Saving to DB
✅ Auto-Sync finished!
```

You can test manually by hitting:

```
http://localhost:4000/ingest/save/customers
```

---

# 🧪 **Testing the System**

### **1️⃣ Start backend**

```bash
cd xeno-backend
npm run dev
```

### **2️⃣ Start frontend**

```bash
cd xeno-frontend
npm run dev
```

### **3️⃣ Visit Dashboard**

```
http://localhost:5173
```

You will see:

✔ Sidebar
✔ Dashboard Cards
✔ Revenue Chart
✔ Customer Table

All data comes directly from Shopify → Prisma → React dashboard.

---

# 🙋‍♂️ **Author**

**Deepesh Raj A.Y**
Xeno FDE Internship Assignment – 2025

---

# 🙏 **Acknowledgements**

* Shopify Admin API
* Prisma ORM
* Axios
* ApexCharts
* Vite + React
* Node.js / Express

---

