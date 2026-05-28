import { NextResponse } from "next/server";

import { parseUpdateContactMessageBody } from "@/app/helper/contact-messages/contact-messages";
import { prisma } from "@/app/helper/prisma/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function logRouteError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${route}]`, message, error);
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const contactMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contactMessage) {
      return NextResponse.json(
        { error: "Contact message not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(contactMessage);
  } catch (error) {
    logRouteError("GET /api/contact-me/[id]", error);
    return NextResponse.json(
      { error: "Failed to fetch contact message" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Contact message not found" },
        { status: 404 },
      );
    }

    const parsed = await parseUpdateContactMessageBody(request);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const contactMessage = await prisma.contactMessage.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(contactMessage);
  } catch (error) {
    logRouteError("PATCH /api/contact-me/[id]", error);
    return NextResponse.json(
      { error: "Failed to update contact message" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Contact message not found" },
        { status: 404 },
      );
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logRouteError("DELETE /api/contact-me/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete contact message" },
      { status: 500 },
    );
  }
}
