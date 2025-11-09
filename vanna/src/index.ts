import "dotenv/config";
import express from "express";
import cors from "cors";
import { simpleSchema } from "./schema";
import { Client } from "pg";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/schema", (_req, res) => res.json(simpleSchema));


app.post("/sql", async (req, res) => {
const { sql } = req.body as { sql?: string };
if (!sql) return res.status(400).json({ error: "sql required" });
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try { const r = await client.query(sql); res.json(r.rows); }
catch (e:any) { res.status(400).json({ error: String(e.message || e) }); }
finally { await client.end(); }
});


const port = Number(process.env.VANNA_PORT||5050);
app.listen(port, ()=> console.log(`Vanna service on http://localhost:${port}`));