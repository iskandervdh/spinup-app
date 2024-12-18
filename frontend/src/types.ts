export type Project = {
  domain: string;
  port: number;
  commands: string[];
  dir: string | null;
  variables: Record<string, unknown>;
};

export type Projects = Record<string, Project>;

export type Commands = Record<string, string>;
