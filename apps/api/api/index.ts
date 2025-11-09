import app from "../src/app";

// Vercel's Node runtime will call this function for /api/*
export default function handler(req: any, res: any) {
  return app(req, res); // Express is a request handler, so just pass through
}
