import { useState, useEffect } from "react";
import { Users, Briefcase, FileText, TrendingUp, Plus } from "lucide-react";
import { Application, statusColors, type ApplicationStatus, Job } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PortalHeader from "@/components/PortalHeader";
import { api } from "@/lib/api";
import { toast } from "sonner";

const statusLabels: Record<ApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offered: "Offered",
  hired: "Hired",
  rejected: "Rejected",
};

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appData, jobData] = await Promise.all([
          api.getApplications(),
          api.getJobs()
        ]);
        setApplications(appData);
        setJobs(jobData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Open Positions", value: jobs.filter((j) => j.status === "open").length, icon: Briefcase, color: "text-primary" },
    { label: "Total Applications", value: applications.length, icon: FileText, color: "text-accent" },
    { label: "New Applications", value: applications.filter((a) => a.status === "new").length, icon: TrendingUp, color: "text-info" },
    { label: "Shortlisted", value: applications.filter((a) => a.status === "shortlisted").length, icon: Users, color: "text-success" },
  ];

  const filteredApps = filterStatus === "all" ? applications : applications.filter((a) => a.status === filterStatus);

  const updateStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await api.updateApplicationStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
      toast.success(`Application status updated to ${statusLabels[newStatus]}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage jobs, candidates, and recruitment pipeline</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="h-4 w-4 mr-1" /> Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-heading">Post a New Job</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newJob = {
                  title: formData.get("title") as string,
                  department: formData.get("department") as string,
                  location: formData.get("location") as string,
                  type: formData.get("type") as any,
                  salary: formData.get("salary") as string,
                  description: formData.get("description") as string,
                  status: "open",
                  closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                };
                try {
                  await api.createJob(newJob);
                  toast.success("Job posted successfully!");
                  const updatedJobs = await api.getJobs();
                  setJobs(updatedJobs);
                } catch (error) {
                  toast.error("Failed to post job");
                }
              }}>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input name="title" placeholder="e.g. Security Analyst" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input name="department" placeholder="e.g. Investigations" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input name="location" placeholder="e.g. Nairobi" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select name="type" defaultValue="Full-time">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Input name="salary" placeholder="e.g. KES 80K-120K" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea name="description" rows={3} placeholder="Job description..." required />
                </div>
                <Button type="submit" variant="accent" className="w-full">Publish Job</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`p-2.5 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="mt-4">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="font-heading text-lg">All Applications</CardTitle>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{app.applicantName}</p>
                            <p className="text-xs text-muted-foreground">{app.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{app.jobTitle}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{app.appliedDate}</TableCell>
                        <TableCell>
                          <Badge className={`${statusColors[app.status]} text-xs`}>
                            {statusLabels[app.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={app.status}
                            onValueChange={(val) => updateStatus(app.id, val as ApplicationStatus)}
                          >
                            <SelectTrigger className="w-[130px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredApps.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground text-sm">
                    No applications found.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">All Job Listings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Closing Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium text-sm">{job.title}</TableCell>
                        <TableCell className="text-sm">{job.department}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{job.location}</TableCell>
                        <TableCell className="text-sm">{job.type}</TableCell>
                        <TableCell>
                          <Badge className={job.status === "open" ? "bg-success text-success-foreground" : ""} variant={job.status === "open" ? "default" : "secondary"}>
                            {job.status === "open" ? "Open" : "Closed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{job.closingDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
