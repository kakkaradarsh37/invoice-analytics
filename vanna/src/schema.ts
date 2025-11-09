export const simpleSchema = {
tables: {
Vendor: ["id","name","taxId","address"],
Customer: ["id","name","address"],
Invoice: ["id","externalId","number","documentType","currency","date","deliveryDate","subTotal","taxTotal","total","vendorId","customerId","status"],
LineItem: ["id","invoiceId","srNo","description","quantity","unitPrice","totalPrice","sachkonto","buSchluessel","vatRate","vatAmount","category"],
Payment: ["id","invoiceId","dueDate","netDays","discountPct","discountDays","discountDue","bankAccount","bic","accountName","discountedTotal"],
Document: ["id","invoiceId","path","title","fileType","sizeBytes","status","uploadedAt"]
}
};