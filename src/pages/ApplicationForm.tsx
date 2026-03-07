import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle, ChevronRight, Briefcase, MapPin, Clock, Calendar, Mail, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PortalHeader from "@/components/PortalHeader";
import { PortalFooter } from "@/components/PortalFooter";
import { Job } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        const data = await api.getJob(jobId);
        setJob(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-4 border-[#06A3DA]/20 border-t-[#06A3DA] rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Preparing Application...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <PortalHeader />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full">
            <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#091E3E] mb-2 uppercase tracking-tight">Job Not Found</h2>
            <p className="text-slate-500 mb-8">This position may have been recently filled or the link is incorrect.</p>
            <Button asChild className="w-full bg-[#06A3DA] hover:bg-[#058dbd] text-white font-bold tracking-widest uppercase py-6 rounded-xl shadow-lg">
              <Link to="/">Browse Active Jobs</Link>
            </Button>
          </div>
        </div>
        <PortalFooter />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <PortalHeader />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#091E3E] mb-2 uppercase tracking-tight">Application Success!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Thank you for applying to be our next <strong className="text-[#091E3E]">{job.title}</strong>.
              Our HR team will review your credentials and contact you shortly regarding the next steps.
            </p>
            <Button asChild className="w-full bg-[#06A3DA] hover:bg-[#058dbd] text-white font-bold tracking-widest uppercase py-6 rounded-xl shadow-lg">
              <Link to="/">Back to Careers</Link>
            </Button>
          </div>
        </div>
        <PortalFooter />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;

    setIsSubmitting(true);
    try {
      let resumeUrl = "";
      if (resumeFile) {
        const uploadRes = await api.uploadResume(resumeFile);
        resumeUrl = uploadRes.url;
      }

      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        applicantName: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        coverLetter: formData.get("cover") as string,
        resumeUrl: resumeUrl
      };

      await api.submitApplication(applicationData);
      setSubmitted(true);
      toast.success("Application successfully registered in our system!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during submission. Please check your data and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <PortalHeader />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="bg-[#091E3E] text-white py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4 lg:px-8">
            <Link to="/" className="text-[#06A3DA] hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Listings
            </Link>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mt-3 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#06A3DA]" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#06A3DA]" /> {job.type}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#06A3DA]" /> {job.salary}</span>
                </div>
              </div>
              <Badge className="bg-[#06A3DA] text-white px-4 py-1.5 font-bold tracking-widest uppercase text-[10px] rounded-full">Open Enrollment</Badge>
            </div>
          </div>
        </section>

        {/* Form & Sidebar Grid */}
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
              <div>
                <h3 className="text-[#091E3E] font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#06A3DA]" /> Role Summary
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {job.description}
                </p>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div>
                <h3 className="text-[#091E3E] font-bold uppercase tracking-widest text-xs mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06A3DA] mt-2 shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#06A3DA]" /> Applications close: {new Date(job.closingDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div className="bg-[#06A3DA] rounded-2xl p-8 text-white shadow-xl shadow-[#06A3DA]/20 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-xl font-bold mb-3 relative z-10">Need Assistance?</h4>
              <p className="text-white/80 text-sm mb-6 relative z-10 font-medium leading-relaxed">
                If you encounter any issues during the application process, please reach out to our talent team at info@spectrumnetworkpi.com
              </p>
              <a href="https://spectrumnetworkpi.com/contact.html" className="text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                Contact Careers Support <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 lg:px-10 py-8 border-b border-slate-50">
                <h2 className="text-2xl font-bold text-[#091E3E]">Personal Details & Documents</h2>
                <p className="text-slate-400 text-sm mt-1 font-medium">Please fill out all required fields marked with an asterisk (*)</p>
              </div>
              <div className="p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Full Name *</Label>
                      <Input id="name" name="name" placeholder="e.g. John Doe" className="h-12 border-slate-200 focus:border-[#06A3DA] rounded-lg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" className="h-12 border-slate-200 focus:border-[#06A3DA] rounded-lg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" className="h-12 border-slate-200 focus:border-[#06A3DA] rounded-lg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Current Location</Label>
                      <Input id="location" name="location" placeholder="e.g. Nairobi, Kenya" className="h-12 border-slate-200 focus:border-[#06A3DA] rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover" className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1">Cover Letter / Pitch</Label>
                    <Textarea id="cover" name="cover" rows={6} placeholder="How can you contribute to Spectrum Network?" className="border-slate-200 focus:border-[#06A3DA] rounded-lg resize-none p-4" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#091E3E] font-bold text-xs uppercase tracking-wider pl-1 font-heading">Digital Resume / CV *</Label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-10 cursor-pointer hover:border-[#06A3DA] hover:bg-[#06A3DA]/5 transition-all group group-hover:shadow-inner">
                      <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:bg-[#06A3DA]/10 group-hover:scale-110 transition-all">
                        <Upload className="h-8 w-8 text-slate-400 group-hover:text-[#06A3DA]" />
                      </div>
                      <span className="text-sm font-bold text-[#091E3E] group-hover:text-[#06A3DA] transition-colors">
                        {fileName || "Click or drop file to upload"}
                      </span>
                      <span className="text-xs text-slate-400 mt-2 font-medium">PDX, DOC, or DOCX up to 5MB</span>
                      <input
                        name="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            setResumeFile(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full bg-[#091E3E] hover:bg-[#06A3DA] text-white font-bold tracking-[0.2em] uppercase transition-all h-16 rounded-2xl shadow-xl shadow-[#091E3E]/20 active:scale-95 text-xs" disabled={isSubmitting}>
                      {isSubmitting ? "Processing Application..." : "Finalize & Submit Application"}
                    </Button>
                    <p className="text-center text-[10px] text-slate-400 mt-6 font-medium uppercase tracking-widest px-8">
                      By submitting, you agree to our recruitment privacy policy and consent to background screening if required.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PortalFooter />
    </div>
  );
};

export default ApplicationForm;
