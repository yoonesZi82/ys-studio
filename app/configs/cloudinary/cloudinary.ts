import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

let isConfigured = false;

function ensureCloudinaryConfigured() {
  if (isConfigured) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  isConfigured = true;
}

export function validateProjectImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Invalid image type. Allowed: JPEG, PNG, WebP, GIF.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "Image must be 5MB or smaller.";
  }

  return null;
}

export async function uploadProjectImage(file: File): Promise<string> {
  ensureCloudinaryConfigured();

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "ys-app/projects",
          resource_type: "image",
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }

          resolve(uploadResult);
        },
      );

      upload.end(buffer);
    },
  );

  return result.secure_url;
}
