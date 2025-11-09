// import { api } from "../lib/fetcher";


// async function getOverview(){
// return api<{totalSpendYTD:number;totalInvoices:number;documentsUploaded:number;averageInvoiceValue:number}>("/metrics/overview");
// }


// export async function OverviewCards(){
// const m = await getOverview();
// const Card = ({label,value,sub}:{label:string;value:number|string;sub?:string}) => (
// <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
// <div className="flex items-center justify-between">
// <div className="text-sm text-neutral-500">{label}</div>
// {/* <div className="text-xs text-green-600">{sub}</div> */}
// {/* Extract numeric change value */}
// {(() => {
//   // Safely parse a number out of sub, e.g. "+8.2% from last month"
//   const num = parseFloat(sub);
//   const change = isNaN(num) ? 0 : num;

//   return (
//     <div
//       className={`flex items-center gap-1 text-xs font-medium ${
//         change >= 0 ? "text-green-600" : "text-red-600"
//       }`}
//     >
//       {change >= 0 ? (
//         <>
//           {/* Upward arrow */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-3 w-3"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M5 10l7-7m0 0l7 7m-7-7v18"
//             />
//           </svg>
//           <span>+{change}% from last month</span>
//         </>
//       ) : (
//         <>
//           {/* Downward arrow */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-3 w-3"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             />
//           </svg>
//           <span>{change}% from last month</span>
//         </>
//       )}
//     </div>
//   );
// })()}

// </div>
// <div className="mt-2 text-3xl font-semibold tracking-tight">{fmt(value)}</div>
// </div>
// );
// return (
// <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
// <Card label="Total Spend (YTD)" value={m.totalSpendYTD} sub="YTD" />
// <Card label="Total Invoices Processed" value={m.totalInvoices} sub="" />
// <Card label="Documents Uploaded" value={m.documentsUploaded} sub="This Month" />
// <Card label="Average Invoice Value" value={m.averageInvoiceValue} sub="" />
// </div>
// );
// }
// function fmt(n:number|string){ const x = typeof n === 'string'? Number(n): n; return Number.isFinite(x) ? x.toLocaleString(undefined,{ style:'currency', currency:'EUR'}) : String(n); }

import { api } from "../lib/fetcher";
import { TrendingUp, TrendingDown } from "lucide-react";

async function getOverview() {
  return api<{
    totalSpendYTD: number;
    totalInvoices: number;
    documentsUploaded: number;
    averageInvoiceValue: number;
  }>("/metrics/overview");
}

export async function OverviewCards() {
  const m = await getOverview();

  // Temporary simulated percentage changes (you can replace these with API values later)
  const changes = {
    totalSpendYTD: 8.2,
    totalInvoices: 8.2,
    documentsUploaded: -8.0,
    averageInvoiceValue: 8.2,
  };

  const Card = ({
    label,
    value,
    period,
    change,
  }: {
    label: string;
    value: number | string;
    period?: string;
    change?: number;
  }) => {
    const isPositive = (change ?? 0) >= 0;

    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-neutral-600 font-medium">{label}</div>
            {period && (
              <div className="text-[11px] text-neutral-400 font-medium mt-0.5">
                {period}
              </div>
            )}
          </div>
          {isPositive ? (
            <TrendingUp size={18} className="text-green-600" />
          ) : (
            <TrendingDown size={18} className="text-red-500" />
          )}
        </div>

        {/* Value */}
        <div className="mt-3 text-3xl font-semibold tracking-tight">
          {fmt(value)}
        </div>

        {/* Change indicator */}
        <div
          className={`mt-1 flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <>
              <span>+{change?.toFixed(1)}%</span>
              <span className="text-neutral-500">from last month</span>
            </>
          ) : (
            <>
              <span>{change?.toFixed(1)}%</span>
              <span className="text-neutral-500">less from last month</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card
        label="Total Spend"
        value={m.totalSpendYTD}
        period="YTD"
        change={changes.totalSpendYTD}
      />
      <Card
        label="Total Invoices Processed"
        value={m.totalInvoices}
        change={changes.totalInvoices}
      />
      <Card
        label="Documents Uploaded"
        value={m.documentsUploaded}
        period="This Month"
        change={changes.documentsUploaded}
      />
      <Card
        label="Average Invoice Value"
        value={m.averageInvoiceValue}
        change={changes.averageInvoiceValue}
      />
    </div>
  );
}

function fmt(n: number | string) {
  const x = typeof n === "string" ? Number(n) : n;
  return Number.isFinite(x)
    ? x.toLocaleString("de-DE", { style: "currency", currency: "EUR" })
    : String(n);
}
