import { Briefcase, MapPin, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="group transition-all duration-300 hover:shadow-card-hover border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.department}</p>
          </div>
          <Badge variant={isOpen ? "default" : "secondary"} className={isOpen ? "bg-success text-success-foreground" : ""}>
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.type}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {job.salary}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {isOpen && daysLeft > 0 ? `${daysLeft} days left` : "Applications closed"}
          </span>
          {isOpen ? (
            <Button asChild variant="accent" size="sm">
              <Link to={`/apply/${job.id}`}>Apply Now</Link>
            </Button>
          ) : (
            <Button size="sm" disabled variant="secondary">
              Closed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
