import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const cta = await prisma.ctaBanner.findFirst();
    return Response.json(cta);
  } catch (error) {
    console.error("Failed to fetch CTA banner:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const cta = await prisma.ctaBanner.update({
      where: { id },
      data,
    });

    return Response.json(cta);
  } catch (error) {
    console.error("Failed to update CTA banner:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
