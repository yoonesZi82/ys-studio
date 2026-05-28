import { NextResponse } from "next/server";

import { databaseApiErrorResponse } from "@/app/helper/database/database-api-error";
import { parseCreateProjectForm } from "@/app/helper/projects/projects";
import { uploadProjectImage } from "@/app/configs/cloudinary/cloudinary";
import { prisma } from "@/app/helper/prisma/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export type { Project, CreateProjectInput } from "@/app/types/projects.type";

function logRouteError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${route}]`, message, error);
}

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInt(searchParams.get("page"), 1);
    const limit = Math.min(50, parsePositiveInt(searchParams.get("limit"), 4));
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.project.count(),
    ]);

    const hasMore = skip + projects.length < total;

    return NextResponse.json({
      data: projects,
      nextPage: hasMore ? page + 1 : undefined,
      total,
    });
  } catch (error) {
    logRouteError("GET /api/projects", error);

    const dbError = databaseApiErrorResponse(error);
    if (dbError) return dbError;

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const parsed = await parseCreateProjectForm(request);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { title, description, link, tags, image } = parsed.data;
    const imageUrl = await uploadProjectImage(image);

    const project = await prisma.project.create({
      data: {
        title,
        description,
        link,
        image: imageUrl,
        tags,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    logRouteError("POST /api/projects", error);

    const message =
      error instanceof Error ? error.message : "Failed to create project";

    const isConfigError = message.includes("Cloudinary is not configured");

    return NextResponse.json(
      { error: isConfigError ? message : "Failed to create project" },
      { status: isConfigError ? 503 : 500 },
    );
  }
}
