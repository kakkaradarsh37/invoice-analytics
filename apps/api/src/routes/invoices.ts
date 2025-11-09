import { Router } from "express";
import { prisma } from "../lib/prisma";


const r = Router();


r.get("/", async (req, res) => {
const { q, sort = "date", order = "desc", page = "1", pageSize = "20", status } = req.query as any;
const take = Math.min(Number(pageSize) || 20, 200);
const skip = (Math.max(Number(page) || 1, 1) - 1) * take;


const where: any = {};
if (status) where.status = String(status);
if (q) {
where.OR = [
{ number: { contains: String(q), mode: "insensitive" } },
{ vendor: { is: { name: { contains: String(q), mode: "insensitive" } } } },
];
}


const [items, total] = await Promise.all([
prisma.invoice.findMany({
where,
include: { vendor: true },
orderBy: { [String(sort)]: String(order) === "asc" ? "asc" : "desc" },
skip, take,
}),
prisma.invoice.count({ where }),
]);


res.json({ items, total, page: Number(page), pageSize: take });
});


export default r;