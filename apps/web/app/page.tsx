// import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// // Inside your layout grid:
// <div className="grid grid-cols-2 gap-6 mt-6">
//   <SpendByCategory data={spendByCategory} />
//   <CashOutflowForecast data={cashOutflow} />
//   <div className="col-span-2">
//     <InvoicesByVendor data={invoicesByVendor} />
//   </div>
// </div>



// async function getData(){
// const [trend,vendor,category,outflow] = await Promise.all([
// api("/charts/invoice-trend"),
// api("/charts/spend-by-vendor?top=10"),
// api("/charts/spend-by-category"),
// api("/charts/cash-outflow-forecast"),
// ]);
// return { trend, vendor, category, outflow } as any;
// }


// export default async function Page(){
// const { trend, vendor, category, outflow } = await getData();
// return (
// <main className="space-y-6">
// <OverviewCards />
// <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// <InvoiceTrend data={trend} />
// <SpendByVendor data={vendor} />
// <SpendByCategory data={category} />
// <CashOutflow data={outflow} />
// </div>
// </main>
// );
// }

// 

// "use client";

// import { useEffect, useState } from "react";

// // ✅ Import chart components
// import InvoiceVolumeTrend from "@/components/charts/invoice-trend";
// import SpendByVendor from "@/components/charts/spend-by-vendor";
// import SpendByCategory from "@/components/charts/spend-by-category";
// import CashOutflowForecast from "@/components/charts/cash-outflow";
// import InvoicesByVendor from "@/components/charts/invoices-by-vendor";

// export default function DashboardPage() {
//   // ✅ State variables for each chart’s data
//   const [invoiceTrend, setInvoiceTrend] = useState(null);
//   const [spendByVendor, setSpendByVendor] = useState(null);
//   const [spendByCategory, setSpendByCategory] = useState(null);
//   const [cashOutflow, setCashOutflow] = useState(null);
//   const [invoicesByVendor, setInvoicesByVendor] = useState(null);

//   // ✅ Fetch data from backend
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res1 = await fetch("http://localhost:5000/charts/invoice-trend");
//         const res2 = await fetch("http://localhost:5000/charts/spend-by-vendor");
//         const res3 = await fetch("http://localhost:5000/charts/spend-by-category");
//         const res4 = await fetch("http://localhost:5000/charts/cash-outflow");
//         const res5 = await fetch("http://localhost:5000/charts/invoices-by-vendor");

//         const data1 = await res1.json();
//         const data2 = await res2.json();
//         const data3 = await res3.json();
//         const data4 = await res4.json();
//         const data5 = await res5.json();

//         setInvoiceTrend(data1);
//         setSpendByVendor(data2);
//         setSpendByCategory(data3);
//         setCashOutflow(data4);
//         setInvoicesByVendor(data5);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   // ✅ Loading state
//   if (!invoiceTrend || !spendByVendor || !spendByCategory || !cashOutflow || !invoicesByVendor) {
//     return <div className="p-10 text-center text-gray-500">Loading dashboard...</div>;
//   }

//   // ✅ Main dashboard layout
//   return (
//     <main className="p-6">
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
//         {/* Middle Row */}
//         <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-4">
//           <InvoiceVolumeTrend data={invoiceTrend} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <SpendByVendor data={spendByVendor} />
//         </div>

//         {/* Bottom Row */}
//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <SpendByCategory data={spendByCategory} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <CashOutflowForecast data={cashOutflow} />
//         </div>

//         {/* Full-width Invoices Table */}
//         <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm border p-4">
//           <InvoicesByVendor data={invoicesByVendor} />
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// // Import chart components
// import InvoiceVolumeTrend from "@/components/charts/invoice-trend";
// import SpendByVendor from "@/components/charts/spend-by-vendor";
// import SpendByCategory from "@/components/charts/spend-by-category";
// import CashOutflowForecast from "@/components/charts/cash-outflow";
// import InvoicesByVendor from "@/components/charts/invoices-by-vendor";

// export default function DashboardPage() {
//   // State variables for each chart’s data
//   const [invoiceTrend, setInvoiceTrend] = useState(null);
//   const [spendByVendor, setSpendByVendor] = useState(null);
//   const [spendByCategory, setSpendByCategory] = useState(null);
//   const [cashOutflow, setCashOutflow] = useState(null);
//   const [invoicesByVendor, setInvoicesByVendor] = useState(null);

//   // Fetch data from backend
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [res1, res2, res3, res4, res5] = await Promise.all([
//           fetch("http://localhost:4000/charts/invoice-trend"),
//           fetch("http://localhost:4000/charts/spend-by-vendor"),
//           fetch("http://localhost:4000/charts/spend-by-category"),
//           fetch("http://localhost:4000/charts/cash-outflow"),
//           fetch("http://localhost:4000/charts/invoices-by-vendor"),
//         ]);

//         const [data1, data2, data3, data4, data5] = await Promise.all([
//           res1.json(),
//           res2.json(),
//           res3.json(),
//           res4.json(),
//           res5.json(),
//         ]);

//         setInvoiceTrend(data1);
//         setSpendByVendor(data2);
//         setSpendByCategory(data3);
//         setCashOutflow(data4);
//         setInvoicesByVendor(data5);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   // Loading state
//   if (!invoiceTrend || !spendByVendor || !spendByCategory || !cashOutflow || !invoicesByVendor) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Loading dashboard...
//       </div>
//     );
//   }

//   // Main dashboard layout
//   return (
//     <main className="p-6">
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
//         {/* Top Row */}
//         <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-4">
//           <InvoiceVolumeTrend data={invoiceTrend} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <SpendByVendor data={spendByVendor} />
//         </div>

//         {/* Bottom Row */}
//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <SpendByCategory data={spendByCategory} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4">
//           <CashOutflowForecast data={cashOutflow} />
//         </div>

//         {/* Full-width Invoices Table */}
//         <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm border p-4">
//           <InvoicesByVendor data={invoicesByVendor} />
//         </div>
//       </div>
//     </main>
//   );
// }

// apps/web/app/page.tsx

// import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// // Fetch data directly on the server before rendering
// async function getData() {
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return { trend, vendor, category, outflow, invoices };
// }

// export default async function Page() {
//   const { trend, vendor, category, outflow, invoices } = await getData();

//   return (
//     <main className="space-y-6 p-6">
//       <OverviewCards />

//      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
//   {/* Top Row */}
//   <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-4">
//     <InvoiceTrend data={trend} />
//   </div>

//   <div className="bg-white rounded-2xl shadow-sm border p-4">
//     <SpendByVendor data={vendor} />
//   </div>

//   {/* Bottom Row */}
//   <div className="bg-white rounded-2xl shadow-sm border p-4">
//     <SpendByCategory data={category} />
//   </div>

//   <div className="bg-white rounded-2xl shadow-sm border p-4">
//     <CashOutflow data={outflow} />
//   </div>

//   <div className="bg-white rounded-2xl shadow-sm border p-4">
//     <InvoicesByVendor data={invoices} />
//   </div>
// </div>


//       {/* Flowbit AI footer */}
//       <div className="absolute bottom-5 left-6 flex items-center gap-2">
//         <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
//         <span className="text-sm font-medium text-neutral-700">Flowbit AI</span>
//       </div>
//     </main>
//   );
// }
// import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// async function getData() {
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return { trend, vendor, category, outflow, invoices };
// }

// export default async function Page() {
//   const { trend, vendor, category, outflow, invoices } = await getData();

//   return (
//     <main className="space-y-6">
//       {/* KPI cards */}
//       <OverviewCards />

//       {/* Top row: Trend + Vendor */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-5">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Invoice Volume + Value Trend
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Invoice count and total spend over 12 months.
//           </p>
//           <InvoiceTrend data={trend} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-5">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Spend by Vendor (Top 10)
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Vendor spend with cumulative percentage distribution.
//           </p>
//           <SpendByVendor data={vendor} />
//         </div>
//       </div>

//       {/* Bottom row: Category + Outflow + Invoices */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl shadow-sm border p-5">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Spend by Category
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Distribution of spending across categories.
//           </p>
//           <SpendByCategory data={category} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-5">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Cash Outflow Forecast
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Expected payment obligations grouped by due date.
//           </p>
//           <CashOutflow data={outflow} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-5">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Invoices by Vendor
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Top vendors by invoice count and net value.
//           </p>
//           <InvoicesByVendor data={invoices} />
//         </div>
//       </div>
//     </main>
//   );
// }

import { api } from "../lib/api";
import { OverviewCards } from "../components/cards";
import InvoiceTrend from "../components/charts/invoice-trend";
import SpendByVendor from "../components/charts/spend-by-vendor";
import SpendByCategory from "../components/charts/spend-by-category";
import CashOutflow from "../components/charts/cash-outflow";
import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// ✅ Step 1: Define type interfaces for your data
interface TrendData {
  ym: string;
  volume: number;
  value: number;
}

interface VendorData {
  vendor: string;
  spend: number;
}

interface CategoryData {
  category: string;
  value: number;
  spend: number;
}

interface OutflowData {
  due: string;
  amount: number;
}

interface InvoiceVendorData {
  vendor: string;
  invoices: number;
  netValue: number;
}

// ✅ Step 2: Strongly type your API data function
// async function getData(): Promise<{
//   trend: TrendData[];
//   vendor: VendorData[];
//   category: CategoryData[];
//   outflow: OutflowData[];
//   invoices: InvoiceVendorData[];
// }> {
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return {
//     // ✅ Step 3: Explicitly cast each one
//     trend: trend as TrendData[],
//     vendor: vendor as VendorData[],
//     category: category as CategoryData[],
//     outflow: outflow as OutflowData[],
//     invoices: invoices as InvoiceVendorData[],
//   };
// }
// async function getData(): Promise<{
//   trend: TrendData[];
//   vendor: VendorData[];
//   category: CategoryData[];
//   outflow: { ym: string; forecast: number }[];
//   invoices: InvoiceVendorData[];
// }> {
//   // 👇 explicitly tell TypeScript these will be arrays
//   const [trend, vendor, categoryRaw, outflowRaw, invoices] = await Promise.all([
//     api("/charts/invoice-trend") as Promise<TrendData[]>,
//     api("/charts/spend-by-vendor?top=10") as Promise<VendorData[]>,
//     api("/charts/spend-by-category") as Promise<any[]>, // 👈 fix: explicitly mark as array
//     api("/charts/cash-outflow-forecast") as Promise<any[]>,
//     api("/charts/invoices-by-vendor") as Promise<InvoiceVendorData[]>,
//   ]);

//   // ✅ Transform data to expected shapes
//   const formattedCategory = (categoryRaw || []).map((item: any) => ({
//     category: item.category ?? "Unknown",
//     spend: item.spend ?? item.value ?? 0,
//     value: item.value ?? item.spend ?? 0,
//   }));

//   const formattedOutflow = (outflowRaw || []).map((item: any) => ({
//     ym: item.ym ?? item.month ?? item.due ?? "N/A",
//     forecast: item.forecast ?? item.amount ?? item.total ?? 0,
//   }));

//   return {
//     trend,
//     vendor,
//     category: formattedCategory,
//     outflow: formattedOutflow,
//     invoices,
//   };
// }
async function getData(): Promise<{
  trend: TrendData[];
  vendor: VendorData[];
  category: CategoryData[];
  outflow: { ym: string; forecast: number }[];
  invoices: InvoiceVendorData[];
}> {
  // 👇 Explicitly type the expected structure of each response
  const [trend, vendor, categoryRaw, outflowRaw, invoices] = await Promise.all([
    api("/charts/invoice-trend") as Promise<TrendData[]>,
    api("/charts/spend-by-vendor?top=10") as Promise<VendorData[]>,
    api("/charts/spend-by-category") as Promise<any[]>,
    api("/charts/cash-outflow-forecast") as Promise<any[]>,
    api("/charts/invoices-by-vendor") as Promise<InvoiceVendorData[]>,
  ]);

  // ✅ Format data consistently
  const formattedCategory = (categoryRaw || []).map((item: any) => ({
    category: item.category ?? "Unknown",
    spend: item.spend ?? item.value ?? 0,
    value: item.value ?? item.spend ?? 0,
  }));

  const formattedOutflow = (outflowRaw || []).map((item: any) => ({
    ym: item.ym ?? "Unknown",
    forecast: item.forecast ?? 0,
  }));

  return {
    trend: Array.isArray(trend) ? trend : [],
    vendor: Array.isArray(vendor) ? vendor : [],
    category: formattedCategory,
    outflow: formattedOutflow,
    invoices: Array.isArray(invoices) ? invoices : [],
  };
}

console.log("BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);


export default async function Page() {
  try{
  const { trend, vendor, category, outflow, invoices } = await getData();
  console.log("✅ Data loaded", {
      trend: trend?.length,
      vendor: vendor?.length,
      category: category?.length,
      outflow: outflow?.length,
      invoices: invoices?.length,
    });
  return (
    <main className="space-y-6">
      {/* KPI cards */}
      <OverviewCards />

      {/* Top row: Trend + Vendor */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-semibold text-neutral-800 mb-1">
            Invoice Volume + Value Trend
          </h2>
          <p className="text-xs text-neutral-500 mb-3">
            Invoice count and total spend over 12 months.
          </p>
          <InvoiceTrend data={trend} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-semibold text-neutral-800 mb-1">
            Spend by Vendor (Top 10)
          </h2>
          <p className="text-xs text-neutral-500 mb-3">
            Vendor spend with cumulative percentage distribution.
          </p>
          <SpendByVendor data={vendor} />
        </div>
      </div>

      {/* Bottom row: Category + Outflow + Invoices */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-semibold text-neutral-800 mb-1">
            Spend by Category
          </h2>
          <p className="text-xs text-neutral-500 mb-3">
            Distribution of spending across categories.
          </p>
          <SpendByCategory data={category} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-semibold text-neutral-800 mb-1">
            Cash Outflow Forecast
          </h2>
          <p className="text-xs text-neutral-500 mb-3">
            Expected payment obligations grouped by due date.
          </p>
          <CashOutflow data={outflow} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-semibold text-neutral-800 mb-1">
            Invoices by Vendor
          </h2>
          <p className="text-xs text-neutral-500 mb-3">
            Top vendors by invoice count and net value.
          </p>
          <InvoicesByVendor data={invoices} />
        </div>
      </div>
    </main>
    
  );
}
  catch (err) {
    console.error("❌ Page crashed:", err);
    return <div>Error loading data.</div>;
  }
}


// import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// async function getData() {
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return { trend, vendor, category, outflow, invoices };
// }

// export default async function Page() {
//   const { trend, vendor, category, outflow, invoices } = await getData();

//   return (
//     <main className="min-h-screen bg-neutral-50 p-6 flex flex-col gap-6">
//       {/* === Top KPI cards === */}
//       <div>
//         <OverviewCards />
//       </div>

//       {/* === Chart Section === */}
//       <div className="flex flex-col gap-6 flex-1">
//         {/* ===== Row 1 ===== */}
//         <div className="flex gap-6 items-stretch">
//           {/* Invoice Volume + Value Trend */}
//           <div className="flex-[1.6] bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
//             <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//               Invoice Volume + Value Trend
//             </h2>
//             <p className="text-xs text-neutral-500 mb-3">
//               Invoice count and total spend over 12 months.
//             </p>
//             <div className="flex-1 flex items-center">
//               <InvoiceTrend data={trend} />
//             </div>
//           </div>

//           {/* Spend by Vendor */}
//           <div className="flex-[1] bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
//             <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//               Spend by Vendor (Top 10)
//             </h2>
//             <p className="text-xs text-neutral-500 mb-3">
//               Vendor spend with cumulative percentage distribution.
//             </p>
//             <div className="flex-1 flex items-center">
//               <SpendByVendor data={vendor} />
//             </div>
//           </div>
//         </div>

//         {/* ===== Row 2 ===== */}
//         <div className="flex gap-6 items-stretch">
//           {/* Spend by Category */}
//           <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
//             <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//               Spend by Category
//             </h2>
//             <p className="text-xs text-neutral-500 mb-3">
//               Distribution of spending across different categories.
//             </p>
//             <div className="flex-1 flex items-center justify-center">
//               <SpendByCategory data={category} />
//             </div>
//           </div>

//           {/* Cash Outflow Forecast */}
//           <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
//             <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//               Cash Outflow Forecast
//             </h2>
//             <p className="text-xs text-neutral-500 mb-3">
//               Expected payment obligations grouped by due date ranges.
//             </p>
//             <div className="flex-1 flex items-center justify-center">
//               <CashOutflow data={outflow} />
//             </div>
//           </div>

//           {/* Invoices by Vendor */}
//           <div className="flex-[1.3] bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
//             <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//               Invoices by Vendor
//             </h2>
//             <p className="text-xs text-neutral-500 mb-3">
//               Top vendors by invoice count and net value.
//             </p>
//             <div className="flex-1 overflow-hidden flex items-start">
//               <InvoicesByVendor data={invoices} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


{/* // import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// async function getData() { */}
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return { trend, vendor, category, outflow, invoices };
// }

// export default async function Page() {
//   const { trend, vendor, category, outflow, invoices } = await getData();

//   return (
//     <main className="space-y-6">
//       {/* KPI Row */}
//       <OverviewCards />

//       {/* Chart Grid */}
//       <div
//         className="
//           grid grid-cols-3 gap-6
//           grid-rows-[minmax(360px,1fr)_minmax(340px,1fr)]
//           h-[calc(100vh-260px)]
//         "
//       >
//         {/* Row 1 */}
//         <div className="col-span-2 bg-white rounded-2xl shadow-sm border p-5 flex flex-col">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Invoice Volume + Value Trend
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Invoice count and total spend over 12 months.
//           </p>
//           <div className="flex-1 min-h-[260px]">
//             <InvoiceTrend data={trend} />
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Spend by Vendor (Top 10)
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Vendor spend with cumulative percentage distribution.
//           </p>
//           <div className="flex-1 min-h-[260px]">
//             <SpendByVendor data={vendor} />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Spend by Category
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Distribution of spending across categories.
//           </p>
//           <div className="flex-1 min-h-[240px]">
//             <SpendByCategory data={category} />
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Cash Outflow Forecast
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Expected payment obligations grouped by due date ranges.
//           </p>
//           <div className="flex-1 min-h-[240px]">
//             <CashOutflow data={outflow} />
//           </div>
//         </div>

//         {/* Invoices by Vendor — full visible table, no scroll */}
//         <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col">
//           <h2 className="text-sm font-semibold text-neutral-800 mb-1">
//             Invoices by Vendor
//           </h2>
//           <p className="text-xs text-neutral-500 mb-3">
//             Top vendors by invoice count and net value.
//           </p>
//           <div className="flex-1 min-h-[240px] overflow-visible">
//             <InvoicesByVendor data={invoices} />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }





// import { api } from "../lib/fetcher";
// import { OverviewCards } from "../components/cards";
// import InvoiceTrend from "../components/charts/invoice-trend";
// import SpendByVendor from "../components/charts/spend-by-vendor";
// import SpendByCategory from "../components/charts/spend-by-category";
// import CashOutflow from "../components/charts/cash-outflow";
// import InvoicesByVendor from "../components/charts/invoices-by-vendor";

// // Fetch data directly on the server before rendering
// async function getData() {
//   const [trend, vendor, category, outflow, invoices] = await Promise.all([
//     api("/charts/invoice-trend"),
//     api("/charts/spend-by-vendor?top=10"),
//     api("/charts/spend-by-category"),
//     api("/charts/cash-outflow-forecast"),
//     api("/charts/invoices-by-vendor"),
//   ]);

//   return { trend, vendor, category, outflow, invoices };
// }

// export default async function Page() {
//   const { trend, vendor, category, outflow, invoices } = await getData();

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-neutral-50 p-6 space-y-6">
//       <OverviewCards />

//       {/* Dashboard Layout */}
//       <div
//         className="
//           grid 
//           grid-cols-1 
//           xl:grid-cols-3 
//           gap-4 
//           auto-rows-[minmax(300px,auto)] 
//           mt-4
//         "
//       >
//         {/* Top Row */}
//         <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
//           <InvoiceTrend data={trend} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
//           <SpendByVendor data={vendor} />
//         </div>

//         {/* Bottom Row */}
//         <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
//           <SpendByCategory data={category} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
//           <CashOutflow data={outflow} />
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
//           <InvoicesByVendor data={invoices} />
//         </div>
//       </div>

//       {/* Footer (Flowbit AI) */}
//       <div className="absolute bottom-5 left-6 flex items-center gap-2">
//         <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
//         <span className="text-sm font-medium text-neutral-700">Flowbit AI</span>
//       </div>
//     </main>
//   );
// }
