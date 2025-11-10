import "dotenv/config";
import express from "express";
import cors from "cors";
import invoices from "./routes/invoices.js";
import metrics from "./routes/metrics.js";
import charts from "./routes/charts.js";
import health from "./routes/health.js";
// import app from "./app.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/health", health);
app.use("/invoices", invoices);
app.use("/metrics", metrics);
app.use("/charts", charts);


// const port = Number(process.env.PORT || 4000);
// app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
// const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// // Only used in local dev: Vercel won't run this file.
// app.listen(PORT, () => {
//   console.log(`API listening on http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 4000;

// ✅ Only start the server locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ API running locally at http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel serverless runtime
export default app;
