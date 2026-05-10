import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        serviceInterest: body.serviceInterest || null,
        propertyType: body.propertyType || null,
        message: body.message,
      },
    });

    return Response.json(submission, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact submission:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
