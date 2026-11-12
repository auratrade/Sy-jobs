export type JobCategory = "tech" | "engineering" | "video" | "design" | "other";


export type Job = {
  id: string;
  title: string;
  company: string | null;
  description: string;
  url: string;
  source: string;
  postedAt: string;
  createdAt: string;
   category: JobCategory;
};

export type JobFilters = {
  q?: string;
  source?: string;
  sort?: "newest" | "oldest";
  category: string;
};