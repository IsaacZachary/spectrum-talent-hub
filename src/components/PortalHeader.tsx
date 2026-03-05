import { Link, useLocation } from "react-router-dom";
import { Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortalHeader = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="gradient-primary border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded gradient-accent flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <span className="font-heading font-bold text-primary-foreground text-sm leading-none block">
              SPECTRUM NETWORK
            </span>
            <span className="text-primary-foreground/60 text-[10px] leading-none">
              Recruitment Portal
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/">Jobs</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/admin">
              <Shield className="h-3.5 w-3.5 mr-1" />
              Admin
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default PortalHeader;
