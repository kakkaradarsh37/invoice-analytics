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
// console.log("✅ NEXT_PUBLIC_VANNA_API_BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

// const base =
//   process.env.NEXT_PUBLIC_VANNA_API_BASE_URL?.trim() ||
//   "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app";

// export async function api(path: string) {
//   const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
//   console.log("🔗 Fetching:", url);
//   const res = await fetch(url, { cache: "no-store" });
//   if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
//   return res.json();
// }
// "use server";
console.log("✅ NEXT_PUBLIC_VANNA_API_BASE_URL:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);

// const base =
//   process.env.NEXT_PUBLIC_VANNA_API_BASE_URL?.trim() ||
//   "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app";

const base = "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app";


export async function api(path: string) {
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  console.log("🔗 Fetching:", url);
  try {
    const res = await fetch(url, { cache: "no-store" });
    //const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(`❌ API ${res.status} for ${url}`);
      throw new Error(`API ${res.status}: ${url}`);
    }
    const data = await res.json();
    console.log(`✅ API OK ${url}`, JSON.stringify(data).slice(0, 100) + "...");
    return data;
  } catch (err) {
    console.error("🔥 API error:", err);
    throw err;
  }
}



