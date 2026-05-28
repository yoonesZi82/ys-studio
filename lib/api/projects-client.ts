import axios from "axios";

import type { ProjectsPageResponse } from "@/lib/types/project";

export const SUMMARY_PROJECTS_PAGE_SIZE = 4;

export type ProjectsFetchErrorKind = "offline" | "server" | "unknown";

export class ProjectsFetchError extends Error {
  readonly kind: ProjectsFetchErrorKind;
  readonly status?: number;

  constructor(kind: ProjectsFetchErrorKind, status?: number) {
    super(kind);
    this.name = "ProjectsFetchError";
    this.kind = kind;
    this.status = status;
  }
}

export function isProjectsFetchError(
  error: unknown,
): error is ProjectsFetchError {
  return error instanceof ProjectsFetchError;
}

function resolveFetchErrorKind(error: unknown): ProjectsFetchError {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return new ProjectsFetchError("offline");
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return new ProjectsFetchError("offline");
    }

    if (error.response.status >= 500) {
      return new ProjectsFetchError("server", error.response.status);
    }
  }

  return new ProjectsFetchError("unknown");
}

export async function fetchProjectsPage(
  page: number,
  limit = SUMMARY_PROJECTS_PAGE_SIZE,
): Promise<ProjectsPageResponse> {
  try {
    const { data } = await axios.get<ProjectsPageResponse>("/api/projects", {
      params: { page, limit },
    });

    return data;
  } catch (error) {
    throw resolveFetchErrorKind(error);
  }
}
