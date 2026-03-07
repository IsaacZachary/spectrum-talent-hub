import { Search, Filter, Briefcase, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "@/components/JobCard";
import PortalHeader from "@/components/PortalHeader";
import { PortalFooter } from "@/components/PortalFooter";
import { Job } from "@/lib/types";
import { api } from "@/lib/api";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [type, setType] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.getJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = useMemo(() => {
    const depts = [...new Set(jobs.map((j) => j.department))];
    return depts;
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "all" || job.department === department;
      const matchesType = type === "all" || job.type === type;
      return matchesSearch && matchesDept && matchesType;
    });
  }, [search, department, type, jobs]);

  const openJobs = filtered.filter((j) => j.status === "open");
  const closedJobs = filtered.filter((j) => j.status === "closed");

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PortalHeader />

      {/* Main Content Area */}
      <main className="flex-grow">

        {/* Banner matching main site style */}
        <section className="relative h-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden bg-[#091E3E]">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://spectrumnetworkpi.com/img/carousel-2.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Careers Background"
          />
          <div className="container relative z-20 text-center px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-in fade-in zoom-in duration-500">
              Join Our Team
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium">
              <a href="https://spectrumnetworkpi.com/" className="hover:text-white transition-colors">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Careers</span>
            </div>
          </div>
        </section>

        {/* Filters and Search Bar Section */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 -mt-10 lg:-mt-12 relative z-30 mb-8">
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-5 lg:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-[#091E3E] uppercase tracking-wider pl-1">What position are you looking for?</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E43A3A]" />
                <Input
                  placeholder="e.g. Investigator, Security Manager..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-12 border-slate-200 focus:border-[#E43A3A] focus:ring-[#E43A3A]/10 transition-all rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#091E3E] uppercase tracking-wider pl-1">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#091E3E] uppercase tracking-wider pl-1">Job Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-[#E43A3A] rounded-lg">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        {/* Job Grid */}
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 pb-16 lg:pb-24">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#091E3E]">Available Opportunities</h2>
              <p className="text-slate-500 text-sm mt-1">Found {openJobs.length} open positions matching your search</p>
            </div>
            <div className="text-xs text-slate-400 bg-slate-100 px-4 py-2 rounded-full font-medium">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-[#E43A3A]/20 border-t-[#E43A3A] rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium">Discovering opportunities...</p>
            </div>
          ) : (
            <>
              {openJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {openJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#091E3E] mb-2">No positions found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your filters or search terms to see more results.</p>
                  <button
                    onClick={() => { setSearch(""); setDepartment("all"); setType("all"); }}
                    className="mt-6 text-[#E43A3A] font-bold text-sm tracking-wide uppercase hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Closed Positions Section if present */}
              {closedJobs.length > 0 && (
                <div className="mt-20">
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest text-sm">Recently Closed</h3>
                    <div className="flex-grow h-px bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 filter grayscale">
                    {closedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* About Section matching main site theme */}
          <div className="mt-24 bg-[#E43A3A] rounded-2xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-xl text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-4">Can't find the right role?</h3>
              <p className="text-white/80 leading-relaxed">
                We are always looking for exceptional talent to join Spectrum Network International.
                If you don't see a current opening that fits your profile, feel free to send us an open inquiry.
              </p>
            </div>
            <a
              href="mailto:hr@spectrumnetworkpi.com?subject=Open Application – Spectrum Network International&body=Dear Hiring Team,%0A%0APlease find attached my CV for consideration for any suitable positions at Spectrum Network International.%0A%0AKind regards,"
              className="px-8 py-4 bg-[#091E3E] text-white rounded-lg font-bold hover:shadow-xl transition-all whitespace-nowrap active:scale-95"
            >
              Send Your CV / Profile →
            </a>
          </div>

        </div>
      </main>

      <PortalFooter />
    </div>
  );
};

export default JobListings;
