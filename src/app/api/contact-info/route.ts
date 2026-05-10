import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findFirst();
    return Response.json(contactInfo);
  } catch (error) {
    console.error("Failed to fetch contact info:", error);
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

    const contactInfo = await prisma.contactInfo.update({
      where: { id },
      data,
    });

    return Response.json(contactInfo);
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
