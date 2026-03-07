import { Briefcase, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/lib/types";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const isOpen = job.status === "open";
  const closingDate = new Date(job.closingDate);
  const daysLeft = Math.ceil((closingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="group relative overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-[#E43A3A]/40 rounded-xl">

      {/* Accent Top Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isOpen ? 'bg-[#E43A3A]' : 'bg-slate-300'}`}></div>

      <CardContent className="p-6 lg:p-7 pt-7 lg:pt-8 flex flex-col h-full">

        {/* Header Section */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-lg group-hover:bg-[#E43A3A]/5 transition-colors duration-300">
            <Briefcase className="w-6 h-6 text-[#091E3E] group-hover:text-[#E43A3A] transition-colors" />
          </div>
          <Badge
            variant={isOpen ? "default" : "secondary"}
            className={`font-bold px-3 py-1 text-[10px] uppercase tracking-widest ${isOpen ? "bg-[#E43A3A] text-white" : "bg-slate-100 text-slate-400 border-none"}`}
          >
            {isOpen ? "Active" : "Closed"}
          </Badge>
        </div>

        {/* Title and Dept */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#091E3E] group-hover:text-[#E43A3A] transition-colors mb-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 text-[#E43A3A] font-semibold text-xs uppercase tracking-wider">
            {job.department}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#E43A3A] shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#E43A3A] shrink-0" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="h-4 w-4 text-[#E43A3A] shrink-0" />
            <span className="text-xs">
              {isOpen && daysLeft > 0 ? `Closing in ${daysLeft} days` : "Applications closed"}
            </span>
          </div>
        </div>

        {/* Description line clamp */}
        <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed">
          {job.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto border-t border-slate-100 pt-5">
          {isOpen ? (
            <Button asChild className="w-full bg-[#091E3E] hover:bg-[#E43A3A] text-white font-bold tracking-wide uppercase text-[11px] h-11 rounded group-hover:shadow-lg transition-all">
              <Link to={`/apply/${job.id}`} className="flex items-center justify-center gap-2">
                View Details & Apply
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          ) : (
            <Button disabled className="w-full bg-slate-100 text-slate-400 font-bold uppercase text-[11px] h-11 border-none cursor-not-allowed">
              Applications Closed
            </Button>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default JobCard;
