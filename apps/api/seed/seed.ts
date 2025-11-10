// import "dotenv/config";
// import fs from "node:fs";
// import path from "node:path";
// import { Prisma, PrismaClient } from "@prisma/client";
// import { inferCategory } from "../src/lib/categories";


// const prisma = new PrismaClient();
// const jsonPath = process.env.SEED_JSON || path.join(process.cwd(), "../../data/Analytics_Test_Data.json");


// type AnyObj = Record<string, any>;


// // function toDec(n: any) {
// // if (n === undefined || n === null || n === "") return null;
// // const x = typeof n === "string" ? Number(n.replace(/[€,'\s]/g, "")) : Number(n);
// // return Number.isFinite(x) ? new Prisma.Decimal(x) : null;
// // }
// function toDec(n: any) {
//   if (n === undefined || n === null || n === "") return null;
//   const num = Number(n);
//   return isNaN(num) ? null : num;
// }

// function parseDate(s?: string) {
// if (!s) return null; const d = new Date(String(s)); return isNaN(d.getTime()) ? null : d;
// }
// function str(v: any) { if (v === undefined || v === null) return undefined as any; return String((v as any)?.value ?? v); }
// function num(v: any) { const n = Number((v as any)?.value ?? v); return Number.isFinite(n) ? n : null; }
// function unwrap(obj: AnyObj) { const o: AnyObj = {}; for (const [k, v] of Object.entries(obj||{})) o[k] = (v as any)?.value ?? v; return o; }


// async function main() {
// const raw = fs.readFileSync(jsonPath, "utf-8");
// const docs: AnyObj[] = JSON.parse(raw);


// for (const doc of docs) {
// const llm = doc?.extractedData?.llmData as AnyObj | undefined; if (!llm) continue;
// const vendorV = llm.vendor?.value || {}; const customerV = llm.customer?.value || {};
// const invoiceV = llm.invoice?.value || {}; const summaryV = llm.summary?.value || llm.summary || {};
// const paymentV = llm.payment?.value || {};


// const vendorName = str(vendorV.vendorName) ?? "Unknown Vendor";
// const vendor = await prisma.vendor.upsert({ where: { name: vendorName }, update: { taxId: str(vendorV.vendorTaxId), address: str(vendorV.vendorAddress) }, create: { name: vendorName, taxId: str(vendorV.vendorTaxId), address: str(vendorV.vendorAddress) } });


// const customerName = str(customerV.customerName);
// const customer = customerName ? await prisma.customer.upsert({ where: { name: customerName }, update: { address: str(customerV.customerAddress) }, create: { name: customerName, address: str(customerV.customerAddress) } }) : null;


// const total = num(summaryV.invoiceTotal) ?? 0;


// const invoice = await prisma.invoice.create({ data: {
// externalId: doc._id,
// number: str(invoiceV.invoiceId) ?? str(invoiceV.invoiceNumber),
// documentType: str(summaryV.documentType) ?? "invoice",
// currency: str(summaryV.currencySymbol) ?? "EUR",
// date: parseDate(str(invoiceV.invoiceDate)),
// deliveryDate: parseDate(str(invoiceV.deliveryDate)),
// subTotal: toDec(summaryV.subTotal),
// taxTotal: toDec(summaryV.totalTax),
// total: toDec(total) ?? new Prisma.Decimal(0),
// main().catch((e)=>{console.error(e);process.exit(1);}).finally(async()=>prisma.$disconnect());


import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/prisma.js";
import { inferCategory } from "../src/lib/categories.js";
import { Prisma } from "@prisma/client";

type AnyObj = Record<string, any>;

// const jsonPath = process.env.SEED_JSON || path.join(process.cwd(), "data/Analytics_Test_Data.json");
const jsonPath = path.join(process.cwd(), "../../data/Analytics_Test_Data.json");


async function main() {
  console.log("🧹 Clearing old data...");

  // Delete dependent (child) tables first
  await prisma.lineItem.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.document.deleteMany({});

  // Then delete invoices (parent of above)
  await prisma.invoice.deleteMany({});

  // Then delete vendors and customers (top-level)
  await prisma.vendor.deleteMany({});
  await prisma.customer.deleteMany({});

  console.log("✅ Old data cleared. Now inserting fresh records...");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const docs: AnyObj[] = JSON.parse(raw);

  for (const doc of docs) {
    const llm = doc?.extractedData?.llmData as AnyObj | undefined;
    if (!llm) continue;

    const vendorV = llm.vendor?.value || {};
    const customerV = llm.customer?.value || {};
    const summaryV = llm.summary?.value || llm.summary || {};
    const invoiceV = llm.invoice?.value || {};
    const paymentV = llm.payment?.value || {};

    // ---- Create or find Vendor ----
    const vendor = await prisma.vendor.upsert({
      where: { name: vendorV.vendorName?.value ?? vendorV.vendorName ?? "Unknown Vendor" },
      update: {
        taxId: vendorV.vendorTaxId?.value ?? vendorV.vendorTaxId,
        address: vendorV.vendorAddress?.value ?? vendorV.vendorAddress,
      },
      create: {
        name: vendorV.vendorName?.value ?? vendorV.vendorName ?? "Unknown Vendor",
        taxId: vendorV.vendorTaxId?.value ?? vendorV.vendorTaxId,
        address: vendorV.vendorAddress?.value ?? vendorV.vendorAddress,
      },
    });

    // ---- Create or find Customer ----
    const customer = customerV.customerName || customerV.customerName?.value
      ? await prisma.customer.upsert({
          where: { name: customerV.customerName?.value ?? customerV.customerName },
          update: { address: customerV.customerAddress?.value ?? customerV.customerAddress },
          create: {
            name: customerV.customerName?.value ?? customerV.customerName,
            address: customerV.customerAddress?.value ?? customerV.customerAddress,
          },
        })
      : null;

    const total = summaryV.invoiceTotal?.value ?? summaryV.invoiceTotal ?? 0;

    // ---- Create Invoice ----
    const invoice = await prisma.invoice.create({
      data: {
        externalId: doc._id,
        number: invoiceV.invoiceId?.value ?? invoiceV.invoiceId ?? llm.invoice?.value?.invoiceNumber,
        documentType: summaryV.documentType?.value ?? summaryV.documentType ?? "invoice",
        currency: summaryV.currencySymbol?.value ?? summaryV.currencySymbol ?? "EUR",
        date: parseDate(invoiceV.invoiceDate?.value ?? invoiceV.invoiceDate),
        deliveryDate: parseDate(invoiceV.deliveryDate?.value ?? invoiceV.deliveryDate),
        subTotal: toDec(summaryV.subTotal?.value ?? summaryV.subTotal),
        taxTotal: toDec(summaryV.totalTax?.value ?? summaryV.totalTax),
        total: toDec(total??0),
        vendorId: vendor.id,
        customerId: customer?.id,
        uploadedAt: parseDate(doc.createdAt?.$date ?? doc.createdAt),
        status: (total as number) < 0 ? "credit_note" : "open",
        files: doc.filePath
          ? {
              create: [
                {
                  path: doc.filePath,
                  title: doc.name,
                  fileType: doc.fileType,
                  sizeBytes: numberOrNull(doc.fileSize?.$numberLong),
                },
              ],
            }
          : undefined,
      },
    });

    // ---- Line Items ----
    const items = llm.lineItems?.value?.items?.value ?? llm.lineItems?.value?.items ?? [];
    for (const rawItem of items) {
      const i = normalize(rawItem);
      await prisma.lineItem.create({
        data: {
          invoiceId: invoice.id,
          srNo: i.srNo,
          description: i.description,
          quantity: toDec(i.quantity),
          unitPrice: toDec(i.unitPrice),
          totalPrice: toDec(i.totalPrice),
          sachkonto: str(i.Sachkonto),
          buSchluessel: str(i.BUSchluessel),
          vatRate: toDec(i.vatRate),
          vatAmount: toDec(i.vatAmount),
          category: inferCategory({
            //Sachkonto: str(i.Sachkonto),
            Sachkonto: i.Sachkonto ?? undefined,
            description: i.description,
          }),
        },
      });
    }

    // ---- Payments ----
    if (paymentV) {
      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          dueDate: parseDate(paymentV.dueDate?.value ?? paymentV.dueDate),
          netDays: numberOrNull(paymentV.netDays?.value ?? paymentV.netDays),
          discountPct: toDec(paymentV.discountPercentage?.value ?? paymentV.discountPercentage),
          discountDays: numberOrNull(paymentV.discountDays?.value ?? paymentV.discountDays),
          discountDue: parseDate(paymentV.discountDueDate?.value ?? paymentV.discountDueDate),
          bankAccount: paymentV.bankAccountNumber?.value ?? paymentV.bankAccountNumber,
          bic: paymentV.BIC?.value ?? paymentV.BIC,
          accountName: paymentV.accountName?.value ?? paymentV.accountName,
          discountedTotal: toDec(paymentV.discountedTotal?.value ?? paymentV.discountedTotal),
        },
      });
    }
  }

  console.log("✅ Seed complete!");
}

// ---------- Utility Functions ----------

function normalize(obj: any) {
  const out: AnyObj = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = (v as any)?.value ?? v;
  }
  return out;
}

function parseDate(s?: string) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

// function toDec(n: any) {
//   if (n === undefined || n === null || n === "") return null;
//   const num = Number(n);
//   return Number.isFinite(num) ? num : null;
// }
function toDec(n: any): Prisma.Decimal {
  if (n === undefined || n === null || n === "") return new Prisma.Decimal(0);
  const num = Number(n);
  return new Prisma.Decimal(Number.isFinite(num) ? num : 0);
}

function numberOrNull(n: any) {
  if (n === undefined || n === null || n === "") return null;
  const x = Number(n);
  return Number.isFinite(x) ? x : null;
}

function str(s: any) {
  if (s === undefined || s === null) return null;
  return String(s);
}

// Run main
main()
  .then(() => {
    console.log("✅ Seeding finished successfully!");
  })
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
