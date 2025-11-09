export type InvoiceRow = { vendor: string; date: string; number: string; amount: number; status: string };
export const INVOICE_COLUMNS: { key: keyof InvoiceRow; label: string }[] = [
{ key: 'vendor', label: 'Vendor' },
{ key: 'date', label: 'Date' },
{ key: 'number', label: 'Invoice #' },
{ key: 'amount', label: 'Net Value' },
{ key: 'status', label: 'Status' },
];