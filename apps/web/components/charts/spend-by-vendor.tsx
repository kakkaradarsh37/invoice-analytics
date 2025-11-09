// "use client";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// export default function SpendByVendor({ data }: { data: { vendor: string; spend: number }[] }) {
// return (
// <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
// <div className="mb-3 text-sm font-medium text-neutral-700">Spend by Vendor (Top 10)</div>
// <ResponsiveContainer width="100%" height={280}>
// {/* <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis type="number" />
// <YAxis type="category" dataKey="vendor" width={160} />
// <Tooltip />
// <Bar dataKey="spend" radius={[4,4,4,4]} />
// </BarChart> */}
// <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
//   <CartesianGrid strokeDasharray="3 3" />
//   <XAxis type="number" stroke="#6B7280" />
//   <YAxis type="category" dataKey="vendor" width={160} stroke="#6B7280" />
//   <Tooltip />
//   <Bar dataKey="spend" fill="#4F46E5" radius={[4, 4, 4, 4]} /> {/* ✅ Insert this line */}
// </BarChart>

// </ResponsiveContainer>
// </div>
// );
// }

"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const euro = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function SpendByVendor({ data }: { data: { vendor: string; spend: number }[] }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-neutral-700">Spend by Vendor (Top 10)</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            domain={[0, "dataMax"]}
            tickFormatter={(v) => euro(Number(v))}
            stroke="#6B7280"
          />
          <YAxis type="category" dataKey="vendor" width={170} stroke="#6B7280" />
          <Tooltip formatter={(v: number) => euro(Number(v))} />
          <Bar dataKey="spend" fill="#4F46E5" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
