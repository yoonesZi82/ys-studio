"use client";

import { useMutation } from "@tanstack/react-query";

import {
  contactMessagesQueryKeys,
  createContactMessage,
} from "@/app/helper/contact-messages/contact-messages-client";
import type { CreateContactMessageInput } from "@/app/types/contact-message.type";

export function useSubmitContactMessage() {
  return useMutation({
    mutationKey: [...contactMessagesQueryKeys.all, "create"],
    mutationFn: (input: CreateContactMessageInput) => createContactMessage(input),
  });
}
