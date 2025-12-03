const express = require("express");
const router = express.Router();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Load Shopify credentials
const SHOPIFY_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

const api = axios.create({
  baseURL: `https://${SHOPIFY_URL}/admin/api/2024-01`,
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_TOKEN,
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------
// Fetch Customers
// ----------------------------------------------------
router.get("/customers", async (req, res) => {
  try {
    const response = await api.get("/customers.json");

    res.json({
      message: "Customers fetched successfully",
      count: response.data.customers.length,
      customers: response.data.customers,
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ----------------------------------------------------
// Fetch Products
// ----------------------------------------------------
router.get("/products", async (req, res) => {
  try {
    const response = await api.get("/products.json");

    res.json({
      message: "Products fetched successfully",
      count: response.data.products.length,
      products: response.data.products,
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ----------------------------------------------------
// Fetch Orders
// ----------------------------------------------------
router.get("/orders", async (req, res) => {
  try {
    const response = await api.get("/orders.json");

    res.json({
      message: "Orders fetched successfully",
      count: response.data.orders.length,
      orders: response.data.orders,
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ----------------------------------------------------
// SAVE CUSTOMERS → DATABASE
// ----------------------------------------------------
router.get("/save/customers", async (req, res) => {
  try {
    let tenantId = 1;   // for now, fixed tenant

    // Check if tenant 1 exists
    const tenantExists = await prisma.tenant.findFirst({ where: { id: tenantId } });

    if (!tenantExists) {
      return res.status(400).json({ error: "Tenant 1 does not exist. Register a tenant first." });
    }

    const response = await api.get("/customers.json");
    const customers = response.data.customers;

    console.log("Saving customers to DB:", customers.length);


    for (const c of customers) {
      await prisma.customer.upsert({
        where: { shopifyId: String(c.id) },   // UNIQUE FIELD
        update: {
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name,
          totalSpent: Number(c.total_spent),
        },
        create: {
          tenantId,
          shopifyId: String(c.id),
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name,
          totalSpent: Number(c.total_spent),
        },
      });
    }

    res.json({
      message: "Customers saved to DB",
      count: customers.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/db/customers", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();

    res.json({
      message: "Customers from DB",
      count: customers.length,
      customers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ----------------------------------------------------
// SAVE PRODUCTS → DATABASE
// ----------------------------------------------------
router.get("/save/products", async (req, res) => {
  try {
    const tenantId = 1; // temporary for assignment

    const response = await api.get("/products.json");
    const products = response.data.products;

    console.log("Saving customers to DB:", products.length);


    for (const p of products) {
      await prisma.product.upsert({
        where: { shopifyId: String(p.id) },
        update: {
          title: p.title,
          price: p.variants?.[0]?.price ? parseFloat(p.variants[0].price) : 0,
        },
        create: {
          tenantId,
          shopifyId: String(p.id),
          title: p.title,
          price: p.variants?.[0]?.price ? parseFloat(p.variants[0].price) : 0,
        }
      });
    }

    res.json({
      message: "Products saved to DB",
      count: products.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// SAVE ORDERS → DATABASE
// ----------------------------------------------------
router.get("/save/orders", async (req, res) => {
  try {
    const tenantId = 1; // temporary for assignment

    const response = await api.get("/orders.json");
    const orders = response.data.orders;

    console.log("Saving customers to DB:", orders.length);


    for (const o of orders) {
      await prisma.order.upsert({
        where: { shopifyId: String(o.id) },
        update: {
          totalPrice: parseFloat(o.total_price),
          createdAt: new Date(o.created_at),
        },
        create: {
          tenantId,
          shopifyId: String(o.id),
          totalPrice: parseFloat(o.total_price),
          createdAt: new Date(o.created_at),
        },
      });
    }

    res.json({
      message: "Orders saved to DB",
      count: orders.length,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
