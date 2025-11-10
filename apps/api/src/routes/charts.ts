// import { Router } from "express";
//import { prisma } from "../lib/prisma";


// const r = Router();


// r.get("/invoice-trend", async (_req, res) => {
// const rows = await prisma.$queryRaw<any[]>`
// SELECT to_char(date_trunc('month', date), 'YYYY-MM') AS ym,
// COUNT(*) AS volume,
// SUM(total) AS value
// FROM "Invoice"
// WHERE date IS NOT NULL
// GROUP BY 1
// ORDER BY 1;`;
// res.json(rows);
// });


// r.get("/spend-by-vendor", async (req, res) => {
// const limit = Math.min(Number(req.query.top) || 10, 50);
// const rows = await prisma.$queryRaw<any[]>`
// SELECT v.name AS vendor, SUM(i.total) AS spend
// FROM "Invoice" i JOIN "Vendor" v ON v.id = i."vendorId"
// GROUP BY v.name
// ORDER BY spend DESC
// LIMIT ${limit};`;
// res.json(rows);
// });


// r.get("/spend-by-category", async (_req, res) => {
// const rows = await prisma.$queryRaw<any[]>`
// SELECT COALESCE(li.category,'Other') AS category, SUM(li."totalPrice") AS spend
// FROM "LineItem" li
// GROUP BY 1
// ORDER BY spend DESC;`;
// res.json(rows);
// });


// r.get("/cash-outflow-forecast", async (_req, res) => {
// const rows = await prisma.$queryRaw<any[]>`
// SELECT to_char(date_trunc('month', p."dueDate"), 'YYYY-MM') AS ym,
// SUM(COALESCE(p."discountedTotal", i.total)) AS forecast
// FROM "Payment" p JOIN "Invoice" i ON i.id = p."invoiceId"
// WHERE p."dueDate" IS NOT NULL
// GROUP BY 1
// ORDER BY 1;`;
// res.json(rows);
// });


// export default r;

// import { Router } from "express";
// import { PrismaClient } from "@prisma/client";

// const router = Router();
// const prisma = new PrismaClient();

// // GET /charts/invoice-trend
// router.get("/invoice-trend", async (req, res) => {
//   try {
//     // Get monthly invoice count and total value
//     const invoices = await prisma.invoice.findMany({
//       select: {
//         date: true,
//         subTotal: true,
//       },
//     });

//     // Group data by month-year
//     const monthlyData: Record<string, { count: number; total: number }> = {};

//     invoices.forEach((inv) => {
//       const d = new Date(inv.date);
//       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//       if (!monthlyData[key]) monthlyData[key] = { count: 0, total: 0 };
//       monthlyData[key].count += 1;
//       monthlyData[key].total += Number(inv.subTotal);
//     });

//     const labels = Object.keys(monthlyData).sort();
//     const counts = labels.map((l) => monthlyData[l].count);
//     const totals = labels.map((l) => monthlyData[l].total);

//     res.json({ labels, counts, totals });
//   } catch (err) {
//     console.error("Error in /charts/invoice-trend:", err);
//     res.status(500).json({ error: "Failed to load chart data" });
//   }
// });

// export default router;

// import express from "express";
// import { prisma }from "../lib/prisma";

// const router = express.Router();

// // =====================
// // EXISTING ROUTE
// // =====================
// router.get("/invoice-trend", async (req, res) => {
//   try {
//     const invoices = await prisma.invoice.findMany({
//       select: {
//         date: true,
//         subTotal: true,
//       },
//     });

//     const monthlyTotals: Record<string, number> = {};

//     for (const inv of invoices) {
//       if (!inv.date) continue;
//       const monthKey = new Date(inv.date).toLocaleString("default", { month: "short", year: "numeric" });
//       monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + (Number(inv.subTotal) || 0);
//     }

//     const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
//       month,
//       total,
//     }));

//     res.json(chartData);
//   } catch (err) {
//     console.error("Error loading chart data:", err);
//     res.status(500).json({ error: "Failed to load chart data" });
//   }
// });
// import { Router } from "express";
// import { prisma } from "../lib/prisma.js";

// const router = Router();

// // 📊 Invoice Volume + Value Trend
// router.get("/invoice-trend", async (req:any, res:any) => {
//   try {
//     const result = await prisma.invoice.groupBy({
//       by: ["date"],
//       _count: { id: true },
//       _sum: { subTotal: true },
//     });

//     // Group by month-year
//     const formatted = result
//       .filter((r) => r.date)
//       .map((r) => {
//         const d = new Date(r.date);
//         const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//         return {
//           ym,
//           volume: r._count.id,
//           value: Number(r._sum.subTotal ?? 0),
//         };
//       })
//       .reduce((acc, curr) => {
//         const existing = acc.find((x) => x.ym === curr.ym);
//         if (existing) {
//           existing.volume += curr.volume;
//           existing.value += curr.value;
//         } else acc.push(curr);
//         return acc;
//       }, [] as any[]);

//     res.json(formatted);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get invoice trend" });
//   }
// });
import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// 📊 Invoice Volume + Value Trend
router.get("/invoice-trend", async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch invoices grouped by date
    const result = await prisma.invoice.groupBy({
      by: ["date"],
      _count: { id: true },
      _sum: { subTotal: true },
    });

    // Group and aggregate by year-month
    const formatted = result
      // ✅ Filter out null dates (avoids `new Date(null)` crash)
      .filter((r) => r.date !== null)
      // ✅ Type r.date as Date (after filtering)
      .map((r) => {
        const d = new Date(r.date as Date);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

        return {
          ym,
          volume: r._count.id,
          value: Number(r._sum.subTotal ?? 0),
        };
      })
      // ✅ Combine months with the same ym
      .reduce((acc: any[], curr) => {
        const existing = acc.find((x) => x.ym === curr.ym);
        if (existing) {
          existing.volume += curr.volume;
          existing.value += curr.value;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching invoice trend:", err);
    res.status(500).json({ error: "Failed to get invoice trend" });
  }
});



// =====================
// NEW ROUTE: spend-by-vendor
// =====================
// router.get("/spend-by-vendor", async (req, res) => {
//   try {
//     const result = await prisma.invoice.groupBy({
//       by: ["vendorId"],
//       _sum: { subTotal: true },
//     });

//     const data = await Promise.all(
//       result.map(async (r) => {
//         const vendor = await prisma.vendor.findUnique({
//           where: { id: r.vendorId },
//           select: { name: true },
//         });
//         return {
//           vendor: vendor?.name || "Unknown Vendor",
//           total: r._sum.subTotal || 0,
//         };
//       })
//     );

//     res.json(data);
//   } catch (err) {
//     console.error("Error loading spend-by-vendor:", err);
//     res.status(500).json({ error: "Failed to load vendor spend data" });
//   }
// });


// 📊 Spend by Vendor (Top 10)
// router.get("/spend-by-vendor", async (req, res) => {
//   try {
//     const vendors = await prisma.vendor.findMany({
//       include: {
//         invoices: {
//           select: { subTotal: true },
//         },
//       },
//     });

//     const data = vendors
//       .map((v) => ({
//         vendor: v.name,
//         spend: v.invoices.reduce((sum, i) => sum + (i.subTotal ?? 0), 0),
//       }))
//       .sort((a, b) => b.spend - a.spend)
//       .slice(0, 10);

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get vendor spend" });
//   }
// });

// Spend by Vendor (Top 10) — return € totals as float
router.get("/spend-by-vendor", async (req, res) => {
  const limit = Math.min(Number(req.query.top) || 10, 50);

  // Use SQL so SUM is numeric and not Prisma.Decimal stringified
  const rows = await prisma.$queryRaw<
    { vendor: string; spend: number }[]
  >`
    SELECT v.name AS vendor,
           COALESCE(SUM(COALESCE(i."subTotal", i.total)), 0)::float AS spend
    FROM "Invoice" i
    JOIN "Vendor"  v ON v.id = i."vendorId"
    GROUP BY v.name
    ORDER BY spend DESC
    LIMIT ${limit};
  `;

  res.json(rows);
});


// =====================
// NEW ROUTE: spend-by-category
// =====================
// router.get("/spend-by-category", async (req, res) => {
//   try {
//     const result = await prisma.lineItem.groupBy({
//       by: ["category"],
//       _sum: { totalPrice: true },
//     });

//     const data = result.map((r) => ({
//       category: r.category || "Uncategorized",
//       total: Number(r._sum.totalPrice) || 0,
//     }));

//     res.json(data);
//   } catch (err) {
//     console.error("Error loading spend-by-category:", err);
//     res.status(500).json({ error: "Failed to load spend-by-category data" });
//   }
// });

// 📊 Spend by Category
// router.get("/spend-by-category", async (req, res) => {
//   try {
//     const items = await prisma.lineItem.findMany({
//       select: { sachkonto: true, totalPrice: true },
//     });

//     const grouped: Record<string, number> = {};

//     for (const item of items) {
//       const cat = item.sachkonto ? String(item.sachkonto) : "Unknown";
//       grouped[cat] = (grouped[cat] ?? 0) + (item.totalPrice ?? 0);
//     }

//     const data = Object.entries(grouped).map(([category, spend]) => ({
//       category,
//       spend,
//     }));

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get spend by category" });
//   }
// });
// router.get("/spend-by-category", async (req, res) => {
//   try {
//     const items = await prisma.lineItem.findMany({
//       select: { sachkonto: true, totalPrice: true },
//     });

//     const grouped: Record<string, number> = {};

//     for (const item of items) {
//       const cat = item.sachkonto ? String(item.sachkonto) : "Uncategorized";
//       grouped[cat] = (grouped[cat] ?? 0) + (Number(item.totalPrice) || 0);
//     }

//     const data = Object.entries(grouped).map(([category, spend]) => ({
//       category,
//       spend,
//     }));

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get spend by category" });
//   }
// });

router.get("/spend-by-category", async (_req, res) => {
  const rows = await prisma.$queryRaw<{ category: string | null; spend: number }[]>`
    SELECT COALESCE(li.category, 'Other') AS category,
           COALESCE(SUM(li."totalPrice"), 0)::float AS spend
    FROM "LineItem" li
    GROUP BY 1
    ORDER BY spend DESC;
  `;
  // Ensure category is a string
  res.json(rows.map(r => ({ category: String(r.category ?? "Other"), spend: Number(r.spend || 0) })));
});



// =====================
// NEW ROUTE: cash-outflow-forecast
// =====================
// router.get("/cash-outflow-forecast", async (req, res) => {
//   try {
//     // Aggregate total invoice amounts by due date (using Payment model)
//     const result = await prisma.payment.groupBy({
//       by: ["dueDate"],
//       _sum: { discountedTotal: true },
//       orderBy: { dueDate: "asc" },
//     });

//     const data = result.map((r) => ({
//       date: r.dueDate ? r.dueDate.toISOString().split("T")[0] : "Unknown",
//       total: Number(r._sum.discountedTotal) || 0,
//     }));

//     res.json(data);
//   } catch (err) {
//     console.error("Error loading cash-outflow-forecast:", err);
//     res.status(500).json({ error: "Failed to load cash-outflow-forecast data" });
//   }
// });
  // 📊 Cash Outflow Forecast
router.get("/cash-outflow-forecast", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      select: { dueDate: true, netDays: true },
    });

    const grouped: Record<string, number> = {
      "0-7 days": 0,
      "8-30 days": 0,
      "31-60 days": 0,
      "60+ days": 0,
    };

    for (const p of payments) {
      const days = p.netDays ?? 0;
      if (days <= 7) grouped["0-7 days"] += 1;
      else if (days <= 30) grouped["8-30 days"] += 1;
      else if (days <= 60) grouped["31-60 days"] += 1;
      else grouped["60+ days"] += 1;
    }

    const data = Object.entries(grouped).map(([ym, forecast]) => ({
      ym,
      forecast,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get cash outflow" });
  }
});

router.get("/invoices-by-vendor", async (req, res) => {
  try {
    const rows = await prisma.$queryRaw`
      SELECT v.name AS vendor,
             COUNT(i.id)::int AS invoices,
             COALESCE(SUM(i."subTotal"), 0)::float AS "netValue"
      FROM "Invoice" i
      JOIN "Vendor" v ON v.id = i."vendorId"
      GROUP BY v.name
      ORDER BY "netValue" DESC
      LIMIT 10;
    `;
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch invoices by vendor" });
  }
});


export default router;

