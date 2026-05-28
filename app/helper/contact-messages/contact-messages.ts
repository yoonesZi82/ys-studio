import type {
  CreateContactMessageInput,
  ParsedContactMessageBody,
  ParsedUpdateContactMessageBody,
  UpdateContactMessageInput,
} from "@/app/types/contact-message.type";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN_LENGTH = 10;
const PHONE_MIN_DIGITS = 8;

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

function validateCreateFields(
  body: Record<string, unknown>,
): ParsedContactMessageBody {
  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const locale =
    typeof body.locale === "string" && body.locale.trim()
      ? body.locale.trim()
      : undefined;

  if (!fullName) {
    return { ok: false, error: "fullName is required." };
  }

  if (!email) {
    return { ok: false, error: "email is required." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "email is invalid." };
  }

  if (!phone) {
    return { ok: false, error: "phone is required." };
  }

  if (normalizePhone(phone).length < PHONE_MIN_DIGITS) {
    return { ok: false, error: "phone is invalid." };
  }

  if (!message) {
    return { ok: false, error: "message is required." };
  }

  if (message.length < MESSAGE_MIN_LENGTH) {
    return {
      ok: false,
      error: `message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
    };
  }

  const data: CreateContactMessageInput = {
    fullName,
    email,
    phone,
    message,
  };

  if (locale) {
    data.locale = locale;
  }

  return { ok: true, data };
}

export async function parseCreateContactMessageBody(
  request: Request,
): Promise<ParsedContactMessageBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      error: "Content-Type must be application/json.",
    };
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { ok: false, error: "Invalid JSON body." };
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  return validateCreateFields(body as Record<string, unknown>);
}

export async function parseUpdateContactMessageBody(
  request: Request,
): Promise<ParsedUpdateContactMessageBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      error: "Content-Type must be application/json.",
    };
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { ok: false, error: "Invalid JSON body." };
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const raw = body as Record<string, unknown>;
  const data: UpdateContactMessageInput = {};

  if ("fullName" in raw) {
    if (typeof raw.fullName !== "string" || !raw.fullName.trim()) {
      return { ok: false, error: "fullName must be a non-empty string." };
    }
    data.fullName = raw.fullName.trim();
  }

  if ("email" in raw) {
    if (typeof raw.email !== "string" || !raw.email.trim()) {
      return { ok: false, error: "email must be a non-empty string." };
    }
    const email = raw.email.trim();
    if (!EMAIL_PATTERN.test(email)) {
      return { ok: false, error: "email is invalid." };
    }
    data.email = email;
  }

  if ("phone" in raw) {
    if (typeof raw.phone !== "string" || !raw.phone.trim()) {
      return { ok: false, error: "phone must be a non-empty string." };
    }
    const phone = raw.phone.trim();
    if (normalizePhone(phone).length < PHONE_MIN_DIGITS) {
      return { ok: false, error: "phone is invalid." };
    }
    data.phone = phone;
  }

  if ("message" in raw) {
    if (typeof raw.message !== "string" || !raw.message.trim()) {
      return { ok: false, error: "message must be a non-empty string." };
    }
    const message = raw.message.trim();
    if (message.length < MESSAGE_MIN_LENGTH) {
      return {
        ok: false,
        error: `message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
      };
    }
    data.message = message;
  }

  if ("locale" in raw) {
    if (raw.locale !== null && typeof raw.locale !== "string") {
      return { ok: false, error: "locale must be a string or null." };
    }
    data.locale =
      typeof raw.locale === "string" && raw.locale.trim()
        ? raw.locale.trim()
        : null;
  }

  if ("read" in raw) {
    if (typeof raw.read !== "boolean") {
      return { ok: false, error: "read must be a boolean." };
    }
    data.read = raw.read;
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, error: "At least one field is required to update." };
  }

  return { ok: true, data };
}

export function parseReadFilter(
  value: string | null,
): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}
