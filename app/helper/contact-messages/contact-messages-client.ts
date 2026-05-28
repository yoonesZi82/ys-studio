import axios from "axios";

import type {
  ContactMessage,
  CreateContactMessageInput,
} from "@/app/types/contact-message.type";

export const contactMessagesQueryKeys = {
  all: ["contact-messages"] as const,
  list: (params?: { page?: number; read?: boolean }) =>
    [...contactMessagesQueryKeys.all, "list", params] as const,
  detail: (id: string) =>
    [...contactMessagesQueryKeys.all, "detail", id] as const,
};

export function getSubmitContactErrorMessage(error: unknown): string | null {
  if (axios.isAxiosError<{ error?: string }>(error)) {
    const message = error.response?.data?.error;
    return typeof message === "string" ? message : null;
  }

  return null;
}

export async function createContactMessage(
  input: CreateContactMessageInput,
): Promise<ContactMessage> {
  const { data } = await axios.post<ContactMessage>("/api/contact-me", input);
  return data;
}
