import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
    return Response.json(testimonials);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
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
    const testimonial = await prisma.testimonial.create({ data: body });

    return Response.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
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

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return Response.json(testimonial);
  } catch (error) {
    console.error("Failed to update testimonial:", error);
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

    await prisma.testimonial.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
