import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const PortalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic Header */}
      <header className={`w-full z-[100] transition-all duration-300 ${isScrolled ? 'fixed top-0 bg-white shadow-lg' : 'relative'}`}>

        {/* Topbar only shows when not scrolled or on mobile */}
        {!isScrolled && (
          <div className="bg-[#091E3E] hidden lg:block border-b border-white/5">
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-11 text-[11px] font-medium tracking-wide text-slate-300">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 group cursor-default">
                  <MapPin className="w-3.5 h-3.5 text-[#E43A3A] group-hover:scale-110 transition-transform" />
                  Jacob Chege Drive, off Bogani Road, Karen
                </span>
                <span className="flex items-center gap-2 group cursor-default">
                  <Phone className="w-3.5 h-3.5 text-[#E43A3A] group-hover:scale-110 transition-transform" />
                  +254 700 159 614
                </span>
                <span className="flex items-center gap-2 group cursor-default">
                  <Mail className="w-3.5 h-3.5 text-[#E43A3A] group-hover:scale-110 transition-transform" />
                  info@spectrumnetworkpi.com
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-3 pr-4 border-r border-white/10">
                  <i className="fab fa-twitter hover:text-[#E43A3A] transition-colors cursor-pointer"></i>
                  <i className="fab fa-facebook-f hover:text-[#E43A3A] transition-colors cursor-pointer"></i>
                  <i className="fab fa-linkedin-in hover:text-[#E43A3A] transition-colors cursor-pointer"></i>
                  <i className="fab fa-instagram hover:text-[#E43A3A] transition-colors cursor-pointer"></i>
                  <i className="fab fa-youtube hover:text-[#E43A3A] transition-colors cursor-pointer"></i>
                </div>
                <Link to="/admin" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-bold uppercase tracking-widest text-[9px]">
                  <Shield className="w-3 h-3" /> Admin
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className={`container mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-24'}`}>

          <a href="https://spectrumnetworkpi.com" className="flex items-center gap-3 shrink-0 h-full py-4 lg:py-5">
            <img
              src="https://spectrumnetworkpi.com/img/Spectrum.png"
              alt="Spectrum Network International"
              className="h-full object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center h-full space-x-1">
            <NavItem href="https://spectrumnetworkpi.com/" label="Home" isScrolled={isScrolled} />
            <NavItem href="https://spectrumnetworkpi.com/about.html" label="About" isScrolled={isScrolled} />
            <NavItem href="https://spectrumnetworkpi.com/service.html" label="Services" isScrolled={isScrolled} />
            <NavItem href="https://spectrumnetworkpi.com/blog.html" label="Blog" isScrolled={isScrolled} />
            <NavItem href="https://spectrumnetworkpi.com/contact.html" label="Contact" isScrolled={isScrolled} />

            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-slate-200">
              <a href="https://spectrumnetworkpi.com/Background%20checks.html" className="bg-[#E43A3A] hover:bg-[#c02a2a] text-white px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95">
                Background Checks
              </a>
              <Link to="/" className="bg-[#091E3E] hover:bg-[#071833] text-white px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95">
                Careers
              </Link>
            </div>
          </nav>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <Link to="/" className="bg-[#091E3E] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all">
              Careers
            </Link>
          </div>

        </div>
      </header>
      {isScrolled && <div className="h-20 lg:h-24 w-full"></div>}
    </>
  );
};

const NavItem = ({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) => (
  <a
    href={href}
    className={`px-4 h-full flex items-center font-bold text-sm tracking-wide transition-all duration-300 border-b-2 border-transparent hover:border-[#E43A3A] hover:text-[#E43A3A] ${isScrolled ? 'text-[#091E3E]' : 'text-[#091E3E]'}`}
  >
    {label}
  </a>
);

export default PortalHeader;
