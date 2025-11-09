import express from "express";
import cors from "cors";
import routes from "./route"; // whatever file mounts /charts, /health etc.

const app = express();
app.use(cors());
app.use(express.json());

// mount your routes
app.use(routes);

export default app;
