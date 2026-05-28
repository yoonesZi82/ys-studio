export type ProjectsFetchErrorKind = "offline" | "server" | "unknown";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  tags: string[];
};

export type CreateProjectInput = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

export type ProjectsPageResponse = {
  data: Project[];
  nextPage?: number;
  total: number;
};

export type ParsedCreateProjectForm =
  | {
      ok: true;
      data: CreateProjectInput & { image: File };
    }
  | { ok: false; error: string };
