"use client";
import * as React from "react";
export function DataTable<T>({ columns, data }: { columns: { key: keyof T; label: string }[]; data: T[] }) {
const [q, setQ] = React.useState("");
const [sort, setSort] = React.useState<string>("date");
const [order, setOrder] = React.useState<"asc"|"desc">("desc");
const filtered = React.useMemo(()=> data.filter((row:any)=> JSON.stringify(row).toLowerCase().includes(q.toLowerCase())),[q,data]);
function onSort(k:string){ if (sort===k) setOrder(order==='asc'?'desc':'asc'); else { setSort(k); setOrder('asc'); } }
const sorted = React.useMemo(()=> [...filtered].sort((a:any,b:any)=>{ const av=a[sort]; const bv=b[sort]; if(av===bv) return 0; return (av>bv?1:-1) * (order==='asc'?1:-1); }),[filtered,sort,order]);
return (
<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
<div className="mb-3 flex items-center justify-between gap-3">
<input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search…" className="w-64 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400" />
</div>
<div className="max-h-[420px] overflow-auto">
<table className="w-full text-sm">
<thead className="sticky top-0 bg-neutral-50">
<tr>{columns.map((c)=>(<th key={String(c.key)} onClick={()=>onSort(String(c.key))} className="cursor-pointer px-3 py-2 text-left text-neutral-600">{c.label}</th>))}</tr>
</thead>
<tbody>
{sorted.map((row:any,i:number)=> (
<tr key={i} className="border-t">
{columns.map((c)=>(
<td key={String(c.key)} className="px-3 py-2">
{c.key==='amount'||c.key==='total'? Number(row[c.key]).toLocaleString(undefined,{style:'currency',currency:'EUR'}) : String(row[c.key]??'')}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}