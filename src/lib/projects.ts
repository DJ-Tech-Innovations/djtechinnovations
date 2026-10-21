/**
 * EDIT THIS FILE with your real projects and partners.
 * Entries marked `placeholder: true` are sample content and show a "Sample" badge.
 * Delete the sample entries (or set placeholder to false) once real details are supplied.
 * An empty array shows a friendly empty state instead of a section.
 */
export type Category = "Web" | "Business Software" | "Mobile" | "Automation";

export type BuiltProject = {
  title: string; category: Category; client?: string; summary: string; outcome?: string;
  tech: string[]; year?: string; url?: string; placeholder?: boolean;
};
export type OngoingProject = {
  title: string; category: Category; summary: string; phase: 0 | 1 | 2 | 3 | 4; progress: number;
  tech: string[]; placeholder?: boolean;
};
export type Partner = { name: string; type: string; url?: string; logo?: string; placeholder?: boolean };

export const phases = ["Discover", "Plan and Design", "Develop", "Test and Launch", "Support"];

export const builtProjects: BuiltProject[] = [
  { title: "Project name goes here", category: "Business Software", client: "Client name", summary: "Short description of the problem and what was built, for example an inventory and sales system that replaced spreadsheets.", outcome: "Add a real, verifiable result here.", tech: ["Next.js", "PostgreSQL"], year: "2026", placeholder: true },
  { title: "Project name goes here", category: "Web", client: "Client name", summary: "Short description of a customer portal, booking platform or business website you delivered.", tech: ["React", "TypeScript"], year: "2026", placeholder: true },
  { title: "Project name goes here", category: "Mobile", client: "Client name", summary: "Short description of a mobile app built for customers or staff.", tech: ["React Native"], year: "2025", placeholder: true },
  { title: "Project name goes here", category: "Automation", client: "Client name", summary: "Short description of an integration or workflow automation you delivered.", tech: ["REST APIs", "Webhooks"], year: "2025", placeholder: true },
];

export const ongoingProjects: OngoingProject[] = [
  { title: "Ongoing project name", category: "Business Software", summary: "One or two sentences about what is being built and who it is for.", phase: 2, progress: 55, tech: ["Next.js", "TypeScript"], placeholder: true },
  { title: "Ongoing project name", category: "Mobile", summary: "One or two sentences about what is being built and who it is for.", phase: 1, progress: 25, tech: ["React Native"], placeholder: true },
  { title: "Ongoing project name", category: "Web", summary: "One or two sentences about what is being built and who it is for.", phase: 3, progress: 85, tech: ["React", "Node.js"], placeholder: true },
];

export const partners: Partner[] = [
  { name: "Partner name", type: "Technology partner", placeholder: true },
  { name: "Partner name", type: "Cloud and hosting", placeholder: true },
  { name: "Partner name", type: "Business partner", placeholder: true },
  { name: "Partner name", type: "Integration partner", placeholder: true },
  { name: "Partner name", type: "Technology partner", placeholder: true },
  { name: "Partner name", type: "Business partner", placeholder: true },
];
