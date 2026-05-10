import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return Response.json({ error: "page parameter is required" }, { status: 400 });
    }

    const seo = await prisma.seoSettings.findUnique({
      where: { page },
    });

    return Response.json(seo);
  } catch (error) {
    console.error("Failed to fetch SEO settings:", error);
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
    const { page, ...data } = body;

    if (!page) {
      return Response.json({ error: "page is required" }, { status: 400 });
    }

    const seo = await prisma.seoSettings.upsert({
      where: { page },
      update: data,
      create: { page, ...data },
    });

    return Response.json(seo);
  } catch (error) {
    console.error("Failed to update SEO settings:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
