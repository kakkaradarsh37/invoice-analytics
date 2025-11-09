// "use client";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// export default function CashOutflow({ data }: { data: { ym: string; forecast: number }[] }) {
// return (
// <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
// <div className="mb-3 text-sm font-medium text-neutral-700">Cash Outflow Forecast</div>
// <ResponsiveContainer width="100%" height={280}>
// <BarChart data={data}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="ym" />
// <YAxis />
// <Tooltip />
// <Bar dataKey="forecast" radius={[6,6,0,0]} />
// </BarChart>
// </ResponsiveContainer>
// </div>
// );
// }

"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CashOutflow({ data }: { data: { ym: string; forecast: number }[] }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-neutral-700">Cash Outflow Forecast</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="ym" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          {/* ✅ Here is your visible colored bar */}
          <Bar dataKey="forecast" fill="#4F46E5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
