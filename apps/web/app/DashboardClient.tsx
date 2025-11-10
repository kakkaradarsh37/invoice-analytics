"use client";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "https://invoice-analytics-backend-7qhnisuwz-kakkaradarsh37s-projects.vercel.app/charts/invoice-trend"
      );
      const json = await res.json();
      console.log("📊 Got data:", json);
      setData(json);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Client Fetch Test</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
