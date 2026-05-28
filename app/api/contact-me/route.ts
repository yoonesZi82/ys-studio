import { NextResponse } from "next/server";

import {
  parseCreateContactMessageBody,
  parseReadFilter,
} from "@/app/helper/contact-messages/contact-messages";
import { prisma } from "@/app/helper/prisma/prisma";

export const dynamic = "force-dynamic";

export type {
  ContactMessage,
  CreateContactMessageInput,
  ContactMessagesPageResponse,
} from "@/app/types/contact-message.type";

function logRouteError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${route}]`, message, error);
}

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function databaseConfigResponse(error: unknown) {
  if (
    error instanceof Error &&
    error.message.includes("DATABASE_URL is not set")
  ) {
    return NextResponse.json(
      { error: "Database is not configured on the server" },
      { status: 503 },
    );
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInt(searchParams.get("page"), 1);
    const limit = Math.min(50, parsePositiveInt(searchParams.get("limit"), 20));
    const skip = (page - 1) * limit;
    const read = parseReadFilter(searchParams.get("read"));

    const where = read === undefined ? undefined : { read };

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    const hasMore = skip + messages.length < total;

    return NextResponse.json({
      data: messages,
      nextPage: hasMore ? page + 1 : undefined,
      total,
    });
  } catch (error) {
    logRouteError("GET /api/contact-me", error);

    const dbError = databaseConfigResponse(error);
    if (dbError) return dbError;

    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const parsed = await parseCreateContactMessageBody(request);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { fullName, email, phone, message, locale } = parsed.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone,
        message,
        locale,
      },
    });

    return NextResponse.json(contactMessage, { status: 201 });
  } catch (error) {
    logRouteError("POST /api/contact-me", error);

    const dbError = databaseConfigResponse(error);
    if (dbError) return dbError;

    return NextResponse.json(
      { error: "Failed to create contact message" },
      { status: 500 },
    );
  }
}
