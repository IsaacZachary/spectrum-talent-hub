import { useState, useEffect } from "react";
import { Users, Briefcase, FileText, TrendingUp, Plus, ShieldCheck, Lock, LogOut, ChevronRight, LayoutDashboard, Settings } from "lucide-react";
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
import { PortalFooter } from "@/components/PortalFooter";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const ADMIN_PIN = "1234"; // Default PIN

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      toast.success("Authentication successful!");
    } else {
      toast.error("Incorrect Administration PIN.");
      setPin("");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

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
        toast.error("Failed to fetch dashboard data. Check database connection.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const stats = [
    { label: "Active Jobs", value: jobs.filter((j) => j.status === "open").length, icon: Briefcase, color: "text-[#E43A3A]", bg: "bg-[#E43A3A]/10" },
    { label: "Total Applications", value: applications.length, icon: FileText, color: "text-[#091E3E]", bg: "bg-slate-100" },
    { label: "New Candidates", value: applications.filter((a) => a.status === "new").length, icon: TrendingUp, color: "text-[#E43A3A]", bg: "bg-[#E43A3A]/10" },
    { label: "Shortlisted", value: applications.filter((a) => a.status === "shortlisted").length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const filteredApps = filterStatus === "all" ? applications : applications.filter((a) => a.status === filterStatus);

  const updateStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await api.updateApplicationStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
      toast.success(`Candidate status updated to ${statusLabels[newStatus]}`);
    } catch (error) {
      toast.error("Failed to update candidate status");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="bg-[#091E3E] p-8 text-center text-white">
            <div className="w-16 h-16 bg-[#E43A3A] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg rotate-3">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Admin Gateway</h1>
            <p className="text-white/60 text-sm mt-1">Authorized personnel only</p>
          </div>

          <div className="p-8">
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-xs font-bold text-[#091E3E] uppercase tracking-wider pl-1 font-heading">Security PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="text-center text-3xl h-16 tracking-[1em] focus:ring-[#E43A3A]/20 focus:border-[#E43A3A] border-slate-200"
                  maxLength={4}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-[#E43A3A] hover:bg-[#c02a2a] text-white font-bold tracking-widest uppercase transition-all shadow-md active:scale-95">
                Unlock Dashboard
              </Button>
            </form>
            <div className="mt-8 text-center">
              <a href="/" className="text-xs text-slate-400 hover:text-[#E43A3A] font-semibold transition-colors flex items-center justify-center gap-1">
                <ChevronRight className="w-3 h-3 rotate-180" /> Back to Career Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PortalHeader />

      <main className="flex-grow">
        {/* Admin Header Section */}
        <section className="bg-[#091E3E] text-white py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E43A3A] font-bold text-xs uppercase tracking-widest mb-2 bg-[#E43A3A]/10 px-3 py-1 rounded w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Admin Session
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Recruitment Control Panel</h1>
                <p className="text-white/60 text-sm">Oversee candidates and job listings</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white h-11 px-5">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#E43A3A] hover:bg-[#c02a2a] text-white h-11 px-6 font-bold shadow-lg">
                      <Plus className="h-5 w-5 mr-2" /> Post Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl p-0 overflow-hidden border-none animate-in zoom-in-95 duration-200">
                    <div className="bg-[#091E3E] p-6 text-white pb-10">
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#E43A3A]" />
                        New Job Opportunity
                      </h2>
                      <p className="text-white/60 text-sm mt-1">This will be published instantly on the careers portal.</p>
                    </div>
                    <form className="p-8 space-y-6 -mt-6 bg-white rounded-t-[32px]" onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newJob: Partial<Job> = {
                        title: formData.get("title") as string,
                        department: formData.get("department") as string,
                        location: formData.get("location") as string,
                        type: formData.get("type") as any,
                        salary: formData.get("salary") as string,
                        description: formData.get("description") as string,
                        status: "open",
                        closingDate: formData.get("closingDate") as string || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                      };
                      try {
                        await api.createJob(newJob);
                        toast.success("New position published successfully!");
                        const updatedJobs = await api.getJobs();
                        setJobs(updatedJobs);
                      } catch (error) {
                        toast.error("Failed to publish job listing");
                      }
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2 col-span-full">
                          <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Job Title</Label>
                          <Input name="title" placeholder="e.g. Senior Security Analyst" className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Department</Label>
                          <Input name="department" placeholder="e.g. Investigations" className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Location</Label>
                          <Input name="location" placeholder="e.g. Nairobi CBD" className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Job Type</Label>
                          <Select name="type" defaultValue="Full-time">
                            <SelectTrigger className="h-12 border-slate-200 rounded-lg"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Closing Date</Label>
                          <Input name="closingDate" type="date" className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Summary / Description</Label>
                        <Textarea name="description" rows={4} placeholder="Key role overview..." className="border-slate-200 focus:border-[#E43A3A] rounded-lg resize-none" required />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-[#091E3E] hover:bg-[#E43A3A] text-white font-bold tracking-widest uppercase transition-all h-14 rounded-xl shadow-lg">
                        Publish Opportunity
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Dash Body Container */}
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 py-8 lg:py-12">

          {/* Top Line Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-slate-100 hover:border-[#E43A3A]/20 transition-all group overflow-hidden bg-white shadow-sm hover:shadow-md rounded-2xl">
                <CardContent className="flex items-center gap-5 p-6">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#091E3E] tracking-tight">{stat.value}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Sidebar Controls */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sticky top-24">
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'applications' ? 'bg-[#091E3E] text-white shadow-lg shadow-[#091E3E]/10' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Users className="w-4 h-4" /> Applications
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all mt-1 ${activeTab === 'jobs' ? 'bg-[#091E3E] text-white shadow-lg shadow-[#091E3E]/10' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Briefcase className="w-4 h-4" /> Job Listings
                </button>
                <div className="h-px bg-slate-100 my-4 mx-2"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-400 hover:bg-slate-50 transition-all cursor-not-allowed">
                  <TrendingUp className="w-4 h-4" /> Reports
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-400 hover:bg-slate-50 transition-all cursor-not-allowed">
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {activeTab === "applications" ? (
                <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-6 px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg"><Users className="w-5 h-5 text-[#091E3E]" /></div>
                      <CardTitle className="text-xl font-bold text-[#091E3E]">Active Candidates</CardTitle>
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[180px] h-10 border-slate-200 rounded-lg">
                        <SelectValue placeholder="Pipeline Step" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Pipeline Steps</SelectItem>
                        {Object.entries(statusLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest pl-8 py-4">Applicant</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Target Role</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Applied On</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Current Status</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest text-right pr-8 py-4">Update Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredApps.map((app) => (
                            <TableRow key={app.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors">
                              <TableCell className="pl-8 py-5">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-[#091E3E]">{app.applicantName}</p>
                                  <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm font-semibold text-[#091E3E]">{app.jobTitle}</TableCell>
                              <TableCell className="text-xs text-slate-400 font-bold">{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={`${statusColors[app.status]} text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm`}>
                                  {statusLabels[app.status]}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right pr-8">
                                <Select
                                  value={app.status}
                                  onValueChange={(val) => updateStatus(app.id, val as ApplicationStatus)}
                                >
                                  <SelectTrigger className="w-[140px] ml-auto h-9 text-[11px] font-bold uppercase tracking-wider border-slate-200 rounded-lg">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                      <SelectItem key={key} value={key} className="text-[11px] font-semibold">{label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {filteredApps.length === 0 && (
                      <div className="py-20 text-center space-y-3">
                        <div className="bg-slate-50 p-4 rounded-full w-fit mx-auto"><Users className="w-8 h-8 text-slate-200" /></div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">No candidates found in this stage.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="border-b border-slate-50 py-6 px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg"><Briefcase className="w-5 h-5 text-[#091E3E]" /></div>
                      <CardTitle className="text-xl font-bold text-[#091E3E]">Active Job Inventory</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest pl-8 py-4">Opportunity</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Industry / Dept</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Contract</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest py-4">Visibility</TableHead>
                            <TableHead className="font-bold text-[#091E3E] uppercase text-[10px] tracking-widest text-right pr-8 py-4">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {jobs.map((job) => (
                            <TableRow key={job.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors text-slate-900">
                              <TableCell className="pl-8 py-5">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-[#091E3E]">{job.title}</p>
                                  <p className="text-xs text-slate-400 font-medium">{job.location}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm font-semibold text-[#091E3E] uppercase tracking-wider text-[11px]">{job.department}</TableCell>
                              <TableCell className="text-sm font-medium text-slate-500">{job.type}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`${job.status === "open" ? "bg-[#E43A3A] text-white" : "bg-slate-100 text-slate-400 border-none"} cursor-pointer hover:scale-105 transition-transform`}
                                  variant="default"
                                  onClick={async () => {
                                    const newStat = job.status === "open" ? "closed" : "open";
                                    try {
                                      await api.updateJob(job.id, { status: newStat as any });
                                      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: newStat as any } : j));
                                      toast.success(`Position ${newStat === 'open' ? 'Published' : 'Archived'}`);
                                    } catch (e) { toast.error("Toggle failed"); }
                                  }}
                                >
                                  {job.status === "open" ? "Public" : "Archived"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right pr-8">
                                <div className="flex justify-end gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#E43A3A]">
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md bg-white rounded-2xl p-6 text-slate-900">
                                      <DialogTitle className="text-xl font-bold text-[#091E3E] mb-4">Edit Role</DialogTitle>
                                      <form className="space-y-4" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const fd = new FormData(e.currentTarget);
                                        const update: Partial<Job> = {
                                          title: fd.get("title") as string,
                                          department: fd.get("department") as string,
                                          status: fd.get("status") as any,
                                          closingDate: fd.get("closingDate") as string
                                        };
                                        try {
                                          await api.updateJob(job.id, update);
                                          toast.success("Saved");
                                          const refreshed = await api.getJobs();
                                          setJobs(refreshed);
                                        } catch (e) { toast.error("Fail"); }
                                      }}>
                                        <div className="space-y-3">
                                          <Input name="title" defaultValue={job.title} placeholder="Title" />
                                          <Input name="department" defaultValue={job.department} placeholder="Department" />
                                          <Select name="status" defaultValue={job.status}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="open">Open</SelectItem>
                                              <SelectItem value="closed">Closed</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <Button type="submit" className="w-full bg-[#091E3E] mt-4">Save</Button>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-300 hover:text-red-500"
                                    onClick={async () => {
                                      if (confirm("Delete Listing?")) {
                                        await api.deleteJob(job.id);
                                        toast.success("Deleted");
                                        setJobs(prev => prev.filter(j => j.id !== job.id));
                                      }
                                    }}
                                  >
                                    <LogOut className="h-4 w-4 rotate-90" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <PortalFooter />
    </div>
  );
};

export default AdminDashboard;
