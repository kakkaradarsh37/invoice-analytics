import "dotenv/config";
import express from "express";
import cors from "cors";
import invoices from "./routes/invoices";
import metrics from "./routes/metrics";
import charts from "./routes/charts";
import health from "./routes/health";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/health", health);
app.use("/invoices", invoices);
app.use("/metrics", metrics);
app.use("/charts", charts);


const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));