const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// POST - Create Short URL
router.post("/shorten", limiter, async (req, res) => {
  const { originalUrl, customCode, expiryDays } = req.body;

  // 🔥 VALIDATION
  // ✅ STRICT VALIDATION
// ✅ STRICT VALIDATION
if (!originalUrl) {
  return res.status(400).json({ message: "URL is required" });
}

let parsedUrl;

try {
  parsedUrl = new URL(originalUrl);
} catch (error) {
  return res.status(400).json({ message: "Invalid URL format" });
}

// Only allow http and https
if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
  return res.status(400).json({ message: "Only http and https URLs allowed" });
}

 let shortCode = customCode || nanoid(6);

// 🔥 Check if custom/random code already exists
const existing = await Url.findOne({ shortCode });
if (existing) {
  return res.status(400).json({ message: "Code already exists" });
}

const expiryDate = expiryDays
  ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000)
  : null;

const newUrl = await Url.create({
  originalUrl,
  shortCode,
  expiryDate
});

  res.json({
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
  });
});

// GET - Stats (MUST BE ABOVE redirect)
router.get("/stats/:code", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });

  if (!url) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clicks: url.clicks,
    createdAt: url.createdAt,
    expiryDate: url.expiryDate
  });
});

// GET - Redirect (ALWAYS LAST)
router.get("/:code", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });

  if (!url) return res.status(404).json({ message: "Not found" });

  // ✅ EXPIRY CHECK (ADD THIS HERE)
  if (url.expiryDate && url.expiryDate < new Date()) {
    return res.status(410).json({ message: "Link expired" });
  }

  url.clicks++;
  await url.save();

  res.redirect(url.originalUrl);
});

module.exports = router;