import express from "express";
import cors from "cors";
// import routes from "./route.js"; // whatever file mounts /charts, /health etc.
import charts from "./routes/charts.js";
import metrics from "./routes/metrics.js";
import invoices from "./routes/invoices.js";
import health from "./routes/health.js";

const app = express();
app.use(cors());
app.use(express.json());

// mount your routes
// app.use(routes);
app.use("/charts", charts);
app.use("/metrics", metrics);
app.use("/invoices", invoices);
app.use("/health", health);

export default app;
