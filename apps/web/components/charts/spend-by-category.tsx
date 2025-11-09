// "use client";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
// export default function SpendByCategory({ data }: { data: { category: string; spend: number }[] }) {
// return (
// <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
// <div className="mb-3 text-sm font-medium text-neutral-700">Spend by Category</div>
// <ResponsiveContainer width="100%" height={280}>
// <PieChart>
// <Pie dataKey="spend" data={data} nameKey="category" outerRadius={110} label />
// <Tooltip />
// <Legend />
// </PieChart>
// </ResponsiveContainer>
// </div>
// );
// }


// "use client";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

// const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#6366F1", "#EC4899"];

// export default function SpendByCategory({ data }: { data: { category: string; spend: number }[] }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
//       <div className="mb-3 text-sm font-medium text-neutral-700">Spend by Category</div>
//       <ResponsiveContainer width="100%" height={280}>
//         <PieChart>
//           <Pie
//             dataKey="spend"
//             nameKey="category"
//             data={data}
//             outerRadius={100}
//             labelLine={false}
//             label={({ category, percent }) =>
//               `${category} ${(percent * 100).toFixed(1)}%`
//             }
//           >
//             {data.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CategoryData {
  category: string;
  spend: number | string;
}

const COLORS = [
  "#6366F1", // Indigo
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#EC4899", // Pink
  "#8B5CF6", // Violet
];

export default function SpendByCategory({ data }: { data: CategoryData[] }) {
  // 🔹 Normalize and convert all values to numbers
  const cleanData = data
    .map((d) => ({
      category: d.category || "Uncategorized",
      spend: Number(d.spend) || 0,
    }))
    .filter((d) => d.spend > 0);

  // 🔹 If still empty, add mock fallback to verify rendering
  const displayData =
    cleanData.length > 0
      ? cleanData
      : [
          { category: "Operations", spend: 1000 },
          { category: "Marketing", spend: 7250 },
          { category: "Facilities", spend: 1000 },
        ];

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-neutral-700">
        Spend by Category
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="spend"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={95}
            innerRadius={55}
            paddingAngle={3}
            stroke="white"
            isAnimationActive={true}
            label={({ category, percent }) =>
              `${category} ${(percent * 100).toFixed(1)}%`
            }
            labelLine={false}
          >
            {displayData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(val: number) =>
              `€${val.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            }
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "12px",
              color: "#6B7280",
              marginTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
