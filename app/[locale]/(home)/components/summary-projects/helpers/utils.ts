import type { SyntheticEvent } from "react";

import { isProjectsFetchError } from "@/app/helper/projects/projects-client";
import { ProjectsFetchErrorKind } from "@/app/types/projects.type";

export function stopCardNavigation(event: SyntheticEvent) {  event.preventDefault();
  event.stopPropagation();
}

export function resolveProjectsErrorKind(
  error: unknown,
  isOnline: boolean,
): ProjectsFetchErrorKind {
  if (!isOnline) {
    return "offline";
  }

  if (isProjectsFetchError(error)) {
    return error.kind;
  }

  return "unknown";
}
