// // const base = process.env.NEXT_PUBLIC_VANNA_API_BASE_URL?.replace(/\/$/, '')|| 'https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app';;

// // if (!base) {
// //   // Fail fast with a readable error instead of “undefined/charts…”
// //   throw new Error('Missing NEXT_PUBLIC_VANNA_API_BASE_URL in frontend environment');
// // }

// // export async function api(path: string) {
// //   const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;
// //   const res = await fetch(url, { cache: 'no-store' });
// //   if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
// //   return res.json();
// // }
// // console.log("🚀 ENV CHECK:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

// // const base =
// //   process.env.NEXT_PUBLIC_VANNA_API_BASE_URL?.replace(/\/$/, '') ||
// //   "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app";

// // export async function api(path: string) {
// //   const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;
// //    console.log("🔗 Fetching:", url);
// //   const res = await fetch(url, { cache: "no-store" });
// //   if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
// //   return res.json();
// // }

// console.log("✅ NEXT_PUBLIC_VANNA_API_BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

// const base =
//   (process.env.NEXT_PUBLIC_VANNA_API_BASE_URL ||
//     "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app"
//   ).replace(/\/$/, "");

// export async function api(path: string) {
//   try {
//     const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
//     console.log("🔗 Fetching:", url);
//     const res = await fetch(url, { cache: "no-store" });
//     if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
//     return await res.json();
//   } catch (e) {
//     console.error("❌ API call failed:", e);
//     throw e;
//   }
// }
// console.log("✅ NEXT_PUBLIC_VANNA_API_BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

// const base =
//   (process.env.NEXT_PUBLIC_VANNA_API_BASE_URL ||
//     "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app"
//   ).replace(/\/$/, "");

// export async function api(path: string) {
//   const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
//   console.log("🔗 Fetching:", url);
//   const res = await fetch(url, { cache: "no-store" });
//   if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
//   return res.json();
// }

// Log to confirm in runtime
console.log("✅ NEXT_PUBLIC_VANNA_API_BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

const base =
  process.env.NEXT_PUBLIC_VANNA_API_BASE_URL?.trim() ||
  "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app";

export async function api(path: string) {
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  console.log("🔗 Fetching:", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json();
}


