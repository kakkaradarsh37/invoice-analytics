export async function GET() {
  console.log("✅ ENV CHECK:", process.env.NEXT_PUBLIC_VANNA_API_BASE_URL);
  return Response.json({
    env: process.env.NEXT_PUBLIC_VANNA_API_BASE_URL || "undefined",
  });
}
