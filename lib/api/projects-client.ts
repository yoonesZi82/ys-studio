import axios from "axios";

import type { ProjectsPageResponse } from "@/lib/types/project";

export const SUMMARY_PROJECTS_PAGE_SIZE = 4;

export async function fetchProjectsPage(
  page: number,
  limit = SUMMARY_PROJECTS_PAGE_SIZE,
): Promise<ProjectsPageResponse> {
  const { data } = await axios.get<ProjectsPageResponse>("/api/projects", {
    params: { page, limit },
  });

  return data;
}
