import { ParsedCreateProjectForm } from "@/app/types/projects.type";
import { validateProjectImageFile } from "@/app/configs/cloudinary/cloudinary";
import { parseProjectLink } from "@/app/helper/other";

function parseTagsField(raw: FormDataEntryValue | null): string[] | null {
  if (typeof raw !== "string" || !raw.trim()) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      !Array.isArray(parsed) ||
      !parsed.every((tag) => typeof tag === "string")
    ) {
      return null;
    }

    return parsed.map((tag) => tag.trim()).filter(Boolean);
  } catch {
    return null;
  }
}

export async function parseCreateProjectForm(
  request: Request,
): Promise<ParsedCreateProjectForm> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return {
      ok: false,
      error: "Content-Type must be multipart/form-data.",
    };
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return { ok: false, error: "Invalid form data." };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const link = parseProjectLink(formData.get("link"));
  const tags = parseTagsField(formData.get("tags"));
  const image = formData.get("image");

  if (typeof title !== "string" || !title.trim()) {
    return { ok: false, error: "title is required." };
  }

  if (typeof description !== "string" || !description.trim()) {
    return { ok: false, error: "description is required." };
  }

  if (!tags || tags.length === 0) {
    return {
      ok: false,
      error: "tags is required (JSON array of non-empty strings).",
    };
  }

  if (!link.ok) {
    return { ok: false, error: link.error };
  }

  if (!(image instanceof File) || image.size === 0) {
    return { ok: false, error: "image file is required." };
  }

  const imageError = validateProjectImageFile(image);

  if (imageError) {
    return { ok: false, error: imageError };
  }

  return {
    ok: true,
    data: {
      title: title.trim(),
      description: description.trim(),
      link: link.value,
      tags,
      image,
    },
  };
}
