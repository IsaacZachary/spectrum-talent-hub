import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PortalHeader from "@/components/PortalHeader";
import { mockJobs } from "@/lib/mockData";
import { toast } from "sonner";

const ApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === jobId);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg">Job not found.</p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/">Back to listings</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Application Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for applying to <strong>{job.title}</strong>. We'll review your application and get back to you soon.
          </p>
          <Button asChild variant="accent">
            <Link to="/">Browse More Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to listings
          </Link>
        </Button>

        {/* Job Summary */}
        <Card className="mb-6 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-heading text-xl">{job.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {job.department} • {job.location} • {job.type}
                </p>
              </div>
              <Badge className="bg-success text-success-foreground">Open</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground/80">{job.description}</p>
            <div>
              <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
              <ul className="space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Submit Your Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="e.g. Jane Mwangi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location</Label>
                  <Input id="location" placeholder="e.g. Nairobi, Kenya" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input id="experience" type="number" min="0" max="50" placeholder="e.g. 5" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover">Cover Letter</Label>
                <Textarea
                  id="cover"
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Resume / CV *</Label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {fileName || "Click to upload your CV (PDF, DOC, DOCX)"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;
