import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return Response.json({ error: "jobId is required" }, { status: 400 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { jobId, name, email } = body;
    if (!jobId || !name || !email) {
      return Response.json(
        { error: "jobId, name, and email are required" },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: body.jobId,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        resumeUrl: body.resumeUrl || null,
        coverLetter: body.coverLetter || null,
      },
    });

    return Response.json(application, { status: 201 });
  } catch (error) {
    console.error("Failed to create application:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
