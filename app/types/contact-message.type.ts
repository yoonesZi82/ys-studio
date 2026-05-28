export type ContactMessage = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  locale: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateContactMessageInput = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  locale?: string;
};

export type UpdateContactMessageInput = {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string | null;
  read?: boolean;
};

export type ContactMessagesPageResponse = {
  data: ContactMessage[];
  nextPage?: number;
  total: number;
};

export type ParsedContactMessageBody =
  | { ok: true; data: CreateContactMessageInput }
  | { ok: false; error: string };

export type ParsedUpdateContactMessageBody =
  | { ok: true; data: UpdateContactMessageInput }
  | { ok: false; error: string };
