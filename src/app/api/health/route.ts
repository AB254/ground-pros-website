export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT_SET";
  const masked = dbUrl === "NOT_SET" ? dbUrl : dbUrl.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");

  try {
    const { prisma } = await import("@/lib/prisma");
    const count = await prisma.admin.count();
    return Response.json({ status: "ok", db: masked, adminCount: count });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ status: "error", db: masked, error: message }, { status: 500 });
  }
}
