import { api } from "../../lib/fetcher";
import { DataTable } from "../../components/data-table/data-table";
import { INVOICE_COLUMNS, type InvoiceRow } from "../../components/data-table/columns";


async function fetchRows(): Promise<InvoiceRow[]> {
const res = await api<{ items: any[] }>("/invoices");
return res.items.map((i) => ({
vendor: i.vendor?.name ?? "",
date: i.date ? new Date(i.date).toISOString().slice(0, 10) : "",
number: i.number ?? i.externalId,
amount: Number(i.total ?? 0),
status: i.status,
}));
}


export default async function InvoicesPage(){
const rows = await fetchRows();
return (
<main className="space-y-6">
<h1 className="text-2xl font-semibold tracking-tight">Invoices by Vendor</h1>
<DataTable columns={INVOICE_COLUMNS} data={rows} />
</main>
);
}