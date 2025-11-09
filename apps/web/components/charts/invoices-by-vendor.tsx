"use client";
export default function InvoicesByVendor({
  data,
}: {
  data: { vendor: string; invoices: number; netValue: number }[];
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-neutral-700">
        Invoices by Vendor
      </div>
      {/* <table className="w-full text-sm">
        <thead>
          <tr className="text-neutral-500 text-xs font-medium">
            <th className="py-1 text-left">Vendor</th>
            <th className="py-1 text-right"># Invoices</th>
            <th className="py-1 text-right">Net Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr
              key={i}
              className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors"
            >
              <td className="py-2">{v.vendor}</td>
              <td className="py-2 text-right text-neutral-700">{v.invoices}</td>
              <td className="py-2 text-right text-neutral-700">
                €
                {v.netValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
  <thead>
    <tr className="text-neutral-500">
      <th className="px-4 py-2 font-medium">Vendor</th>
      <th className="px-4 py-2 font-medium text-right"># Invoices</th>
      <th className="px-4 py-2 font-medium text-right">Net Value</th>
    </tr>
  </thead>
  <tbody>
    {data.map((row, i) => (
      <tr key={i} className="bg-neutral-50 hover:bg-neutral-100 rounded-lg">
        <td className="px-4 py-2 text-neutral-800">{row.vendor}</td>
        <td className="px-4 py-2 text-right">{row.invoices}</td>
        <td className="px-4 py-2 text-right font-semibold">
          {/* €{row.value.toLocaleString("en-DE", { minimumFractionDigits: 2 })} */}
          {/* €{Number(row.value).toLocaleString("en-DE", { minimumFractionDigits: 2 })} */}
          {/* €{Number(row.net_value).toLocaleString("en-DE", { minimumFractionDigits: 2 })} */}
           {/* €{Number(row.value || row.netvalue || row.total || 0).toLocaleString("en-DE", {
            minimumFractionDigits: 2,
             })} */}
             {/* €{Number(row.value || row.netValue || row.net_value || row.total || 0).toLocaleString("en-DE", {
  minimumFractionDigits: 2,
})} */}
€{Number(
  // ✅ Use only the keys that exist in your interface or API response
  (row as any).netValue ?? (row as any).value ?? (row as any).net_value ?? (row as any).total ?? 0
).toLocaleString("en-DE", {
  minimumFractionDigits: 2,
})}



        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
