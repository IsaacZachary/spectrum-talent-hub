import { Job, Application, ApplicationStatus } from "./types";

const API_BASE_URL = "/recruitment/api"; // Adjusted for subfolder deployment

export const api = {
  // Jobs
  async getJobs(): Promise<Job[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs.php`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();

      const safeArray = Array.isArray(data) ? data : [];

      return safeArray.map((job: any) => ({
        ...job,
        responsibilities: typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities || "[]") : (job.responsibilities || []),
        requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements || "[]") : (job.requirements || []),
        benefits: typeof job.benefits === 'string' ? JSON.parse(job.benefits || "[]") : (job.benefits || []),
      }));
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  },

  async getJob(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs.php?id=${id}`);
    if (!response.ok) throw new Error("Job not found");
    const job = await response.json();
    return {
      ...job,
      requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements || "[]") : job.requirements,
      responsibilities: typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities || "[]") : job.responsibilities,
      benefits: typeof job.benefits === 'string' ? JSON.parse(job.benefits || "[]") : job.benefits
    };
  },

  async createJob(job: Partial<Job>): Promise<{ success: boolean; id: string }> {
    const response = await fetch(`${API_BASE_URL}/jobs.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    return response.json();
  },

  // Applications
  async getApplications(): Promise<Application[]> {
    const response = await fetch(`${API_BASE_URL}/applications.php`);
    if (!response.ok) throw new Error("Failed to fetch applications");
    return response.json();
  },

  async submitApplication(application: Partial<Application>): Promise<{ success: boolean; id: string }> {
    const response = await fetch(`${API_BASE_URL}/applications.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    return response.json();
  },

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/applications.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    return response.json();
  },

  // Upload
  async uploadResume(file: File): Promise<{ status: string; url: string }> {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await fetch(`${API_BASE_URL}/upload.php`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  }
};
