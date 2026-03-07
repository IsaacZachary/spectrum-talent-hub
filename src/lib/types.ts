export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Temporary";
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  status: "open" | "closed" | "draft";
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: "new" | "reviewing" | "shortlisted" | "interview" | "offered" | "hired" | "rejected";
  coverLetter?: string;
  resumeUrl?: string;
}

export type ApplicationStatus = Application["status"];

export const statusColors: Record<ApplicationStatus, string> = {
  new: "bg-info text-info-foreground",
  reviewing: "bg-warning text-warning-foreground",
  shortlisted: "bg-primary text-primary-foreground",
  interview: "bg-accent text-accent-foreground",
  offered: "bg-success text-success-foreground",
  hired: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};
