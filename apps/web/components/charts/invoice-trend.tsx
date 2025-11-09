// "use client";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
// export default function InvoiceTrend({ data }: { data: { ym: string; volume: number; value: number }[] }) {
// return (
// <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
// <div className="mb-3 text-sm font-medium text-neutral-700">Invoice Volume + Value Trend</div>
// <ResponsiveContainer width="100%" height={280}>
// <LineChart data={data}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="ym" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Line type="monotone" dataKey="volume" strokeWidth={2} dot={false} />
// <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
// </LineChart>
// </ResponsiveContainer>
// </div>
// );
// }

// "use client";
// import { useEffect, useState } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
// } from "recharts";

// export default function InvoiceTrend({ data }: { data: { ym: string; volume: number; value: number }[] }) {
//   const [rows, setRows] = useState(data);

//   useEffect(() => setRows(data), [data]);

//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
//       <div className="mb-3 text-sm font-medium text-neutral-700">Invoice Volume + Value Trend</div>
//       <ResponsiveContainer width="100%" height={280}>
//         <LineChart data={rows}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//           <XAxis dataKey="ym" stroke="#6B7280" />
//           <YAxis stroke="#6B7280" />
//           <Tooltip />
//           <Legend />
//           <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#4F46E5" strokeWidth={2} dot={false} />
//           <Line yAxisId="right" type="monotone" dataKey="value" stroke="#9333EA" strokeWidth={2} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function InvoiceTrend({
  data,
}: {
  data: { ym: string; volume: number; value: number }[];
}) {
  const [rows, setRows] = useState(data);

  useEffect(() => setRows(data), [data]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-neutral-700">
        Invoice Volume + Value Trend
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="ym" stroke="#6B7280" />

          {/* ✅ Add two Y axes, with IDs matching the Line components */}
          <YAxis yAxisId="left" stroke="#6B7280" />
          <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />

          <Tooltip />
          <Legend />

          {/* ✅ Use matching yAxisId names */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="volume"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
            name="Volume"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="value"
            stroke="#9333EA"
            strokeWidth={2}
            dot={false}
            name="Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
