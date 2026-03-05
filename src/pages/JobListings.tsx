import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "@/components/JobCard";
import PortalHeader from "@/components/PortalHeader";
import { mockJobs } from "@/lib/mockData";
import { useState, useMemo } from "react";

const JobListings = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [type, setType] = useState("all");

  const departments = useMemo(() => {
    const depts = [...new Set(mockJobs.map((j) => j.department))];
    return depts;
  }, []);

  const filtered = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "all" || job.department === department;
      const matchesType = type === "all" || job.type === type;
      return matchesSearch && matchesDept && matchesType;
    });
  }, [search, department, type]);

  const openJobs = filtered.filter((j) => j.status === "open");
  const closedJobs = filtered.filter((j) => j.status === "closed");

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      
      {/* Hero */}
      <section className="gradient-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Join Our Team
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Be part of Africa's leading Risk Management and Private Investigation firm.
            Explore exciting career opportunities below.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-card rounded-lg shadow-card p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search positions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {openJobs.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Open Positions ({openJobs.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {openJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {closedJobs.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-semibold text-muted-foreground mb-4">
              Closed Positions
            </h2>
            <div className="grid gap-4 md:grid-cols-2 opacity-60">
              {closedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No positions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
