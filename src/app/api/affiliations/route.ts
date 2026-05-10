import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const affiliations = await prisma.affiliation.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
    return Response.json(affiliations);
  } catch (error) {
    console.error("Failed to fetch affiliations:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const affiliation = await prisma.affiliation.create({ data: body });

    return Response.json(affiliation, { status: 201 });
  } catch (error) {
    console.error("Failed to create affiliation:", error);
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

    const affiliation = await prisma.affiliation.update({
      where: { id },
      data,
    });

    return Response.json(affiliation);
  } catch (error) {
    console.error("Failed to update affiliation:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.affiliation.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete affiliation:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
