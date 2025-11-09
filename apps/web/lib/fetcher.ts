const API = process.env.NEXT_PUBLIC_API_URL!;
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
const res = await fetch(`${API}${path}`, { cache: "no-store", ...init });
if (!res.ok) throw new Error(await res.text());
return res.json();
}