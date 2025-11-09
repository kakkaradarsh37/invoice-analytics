export const CATEGORY_FROM_SACHKONTO: Record<string,string> = {
"4400":"Services","3400":"Goods","4910":"Parts","4925":"Subscriptions"
};
export function inferCategory(line: { Sachkonto?: string; description?: string }) {
if (line?.Sachkonto && CATEGORY_FROM_SACHKONTO[line.Sachkonto]) return CATEGORY_FROM_SACHKONTO[line.Sachkonto];
const d = (line.description||"").toLowerCase();
if (d.includes("hour") || d.includes("dienst")) return "Services";
if (d.includes("teile") || d.includes("part")) return "Parts";
if (d.includes("subscription") || d.includes("premium")) return "Subscriptions";
return "Other";
}