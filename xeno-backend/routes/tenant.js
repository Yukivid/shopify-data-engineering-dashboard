const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const { name, storeUrl, apiToken } = req.body;

    const tenant = await prisma.tenant.create({
      data: { name, storeUrl, apiToken }
    });

    res.json({ message: "Tenant registered successfully", tenant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
