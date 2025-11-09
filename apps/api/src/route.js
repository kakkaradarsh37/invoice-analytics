import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// 🧠 Load seed data (Analytics_Test_Data.json)
const dataPath = path.join(process.cwd(), "apps/api/data/Analytics_Test_Data.json");

// Helper: safely load JSON
function loadData() {
  try {
    const jsonData = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error loading data:", err);
    return null;
  }
}

/* -----------------------------------------------
   🩺 1. Health Check
------------------------------------------------- */
router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Invoice Analytics API is healthy" });
});

/* -----------------------------------------------
   📊 2. Invoice Volume + Value Trend
   → /charts/invoice-trend
------------------------------------------------- */
router.get("/charts/invoice-trend", (_req: Request, res: Response) => {
  const data = loadData();
  if (!data) return res.status(500).json({ error: "Data not found" });

  // Map into the format the frontend expects: { ym, volume, value }
  const trend = data.invoiceTrend?.map((item: any) => ({
    ym: item.ym,
    volume: item.volume,
    value: item.value,
  })) || [];

  res.json(trend);
});

/* -----------------------------------------------
   💰 3. Spend by Vendor
   → /charts/spend-by-vendor?top=10
------------------------------------------------- */
router.get("/charts/spend-by-vendor", (req: Request, res: Response) => {
  const data = loadData();
  if (!data) return res.status(500).json({ error: "Data not found" });

  const top = parseInt(req.query.top as string) || 10;

  const vendorSpend = (data.vendorSpend || [])
    .slice(0, top)
    .map((v: any) => ({
      vendor: v.vendor,
      spend: v.spend,
    }));

  res.json(vendorSpend);
});

/* -----------------------------------------------
   🏷️ 4. Spend by Category
   → /charts/spend-by-category
------------------------------------------------- */
router.get("/charts/spend-by-category", (_req: Request, res: Response) => {
  const data = loadData();
  if (!data) return res.status(500).json({ error: "Data not found" });

  const categoryData = (data.spendByCategory || []).map((c: any) => ({
    category: c.category,
    spend: c.spend,
  }));

  res.json(categoryData);
});

/* -----------------------------------------------
   📉 5. Cash Outflow Forecast
   → /charts/cash-outflow-forecast
------------------------------------------------- */
router.get("/charts/cash-outflow-forecast", (_req: Request, res: Response) => {
  const data = loadData();
  if (!data) return res.status(500).json({ error: "Data not found" });

  const forecast = (data.cashOutflowForecast || []).map((o: any) => ({
    ym: o.ym,
    forecast: o.forecast,
  }));

  res.json(forecast);
});

/* -----------------------------------------------
   📑 6. Invoices by Vendor
   → /charts/invoices-by-vendor
------------------------------------------------- */
router.get("/charts/invoices-by-vendor", (_req: Request, res: Response) => {
  const data = loadData();
  if (!data) return res.status(500).json({ error: "Data not found" });

  const invoicesByVendor = (data.invoicesByVendor || []).map((i: any) => ({
    vendor: i.vendor,
    invoiceCount: i.invoiceCount,
    totalValue: i.totalValue,
  }));

  res.json(invoicesByVendor);
});

/* -----------------------------------------------
   Default Route (Optional)
------------------------------------------------- */
router.get("/", (_req: Request, res: Response) => {
  res.send("📊 Invoice Analytics API is running. See /charts/* endpoints.");
});

export default router;
