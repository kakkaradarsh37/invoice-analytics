import { Router } from "express";
import { prisma } from "../lib/prisma.js";


const r = Router();


r.get("/overview", async (_req, res) => {
const now = new Date();
const ytd = new Date(now.getFullYear(), 0, 1);
const [ytdSpend, invoiceCount, docCount, avgInvoice] = await Promise.all([
prisma.invoice.aggregate({ _sum: { total: true }, where: { date: { gte: ytd } } }),
prisma.invoice.count(),
prisma.document.count(),
prisma.invoice.aggregate({ _avg: { total: true } }),
]);
res.json({
totalSpendYTD: ytdSpend._sum.total ?? 0,
totalInvoices: invoiceCount,
documentsUploaded: docCount,
averageInvoiceValue: avgInvoice._avg.total ?? 0,
});
});


export default r;