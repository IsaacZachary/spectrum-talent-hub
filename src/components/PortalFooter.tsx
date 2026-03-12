import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Search } from "lucide-react";

export function PortalFooter() {
    return (
        <footer className="bg-[#091E3E] text-slate-300 w-full mt-auto" style={{ fontFamily: 'Nunito, Rubik, sans-serif' }}>
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Logo Section matching mobile view */}
                    <div className="flex flex-col items-center justify-center text-center h-full bg-[#E43A3A] p-6 lg:p-8 rounded shadow-lg text-white">
                        <a href="https://spectrumnetworkpi.com" className="mb-4">
                            <h1 className="m-0 text-white font-bold text-2xl uppercase leading-tight tracking-tighter">
                                SPECTRUM <br /> NETWORK INTL
                            </h1>
                        </a>
                        <p className="mt-3 mb-4 text-white/90 text-sm italic">
                            "We are a leading African provider of Risk Management, Investigations, and Business Intelligence services"
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="h-9 w-9 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#E43A3A] transition-all">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="h-9 w-9 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#E43A3A] transition-all">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="h-9 w-9 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#E43A3A] transition-all">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:pl-8">
                        {/* Contact Info */}
                        <div className="pt-4 lg:pt-8 mb-4">
                            <div className="relative pb-3 mb-6">
                                <h3 className="text-white text-xl font-bold mb-0">Get In Touch</h3>
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#E43A3A]"></div>
                            </div>
                            <div className="flex mt-2 mb-4 items-start group">
                                <MapPin className="w-5 h-5 mr-3 text-[#E43A3A] shrink-0 mt-1" />
                                <p className="mb-0 text-sm leading-relaxed group-hover:text-white transition-colors">
                                    Hazina Trade Center, 14th Floor,
                                    Moktar Daddah Street, Nairobi Kenya
                                </p>
                            </div>
                            <div className="flex mb-4 items-center group">
                                <Mail className="w-5 h-5 mr-3 text-[#E43A3A] shrink-0" />
                                <p className="mb-0 text-sm group-hover:text-white transition-colors">info@spectrumnetworkpi.com</p>
                            </div>
                            <div className="flex mb-4 items-center group">
                                <Phone className="w-5 h-5 mr-3 text-[#E43A3A] shrink-0" />
                                <p className="mb-0 text-sm group-hover:text-white transition-colors">+254 700 159 614</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="pt-4 lg:pt-8 mb-4">
                            <div className="relative pb-3 mb-6">
                                <h3 className="text-white text-xl font-bold mb-0">Quick Links</h3>
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#E43A3A]"></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-slate-400 hover:text-white transition-colors flex items-center text-sm" href="https://spectrumnetworkpi.com/">
                                    <span className="text-[#E43A3A] mr-2">›</span> Home
                                </a>
                                <a className="text-slate-400 hover:text-white transition-colors flex items-center text-sm" href="https://spectrumnetworkpi.com/about.html">
                                    <span className="text-[#E43A3A] mr-2">›</span> About Us
                                </a>
                                <a className="text-slate-400 hover:text-white transition-colors flex items-center text-sm" href="https://spectrumnetworkpi.com/service.html">
                                    <span className="text-[#E43A3A] mr-2">›</span> Our Services
                                </a>
                                <Link className="text-[#E43A3A] hover:underline transition-colors flex items-center text-sm font-semibold" to="/">
                                    <span className="text-[#E43A3A] mr-2">›</span> Careers / Recruitment
                                </Link>
                                <a className="text-slate-400 hover:text-white transition-colors flex items-center text-sm" href="https://spectrumnetworkpi.com/contact.html">
                                    <span className="text-[#E43A3A] mr-2">›</span> Contact Us
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="pt-4 lg:pt-8 mb-4">
                            <div className="relative pb-3 mb-6">
                                <h3 className="text-white text-xl font-bold mb-0">Join Our Mailing</h3>
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#E43A3A]"></div>
                            </div>
                            <p className="text-xs mb-4 text-slate-400">Receive latest news and updates from Spectrum Intl.</p>
                            <div className="flex h-11">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="bg-white/5 border-none outline-none px-4 flex-grow text-sm text-white focus:bg-white/10 transition-all rounded-l"
                                />
                                <button className="bg-[#091E3E] border border-white/20 px-4 hover:bg-white hover:text-[#091E3E] transition-all rounded-r">
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Footer Bar */}
            <div className="bg-[#061429] py-8 text-sm text-slate-500 border-t border-white/5">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="mb-0">
                            &copy; 2026 <a href="https://spectrumnetworkpi.com" className="text-white hover:text-[#E43A3A]">Spectrum Network International</a>. All Rights Reserved.
                        </p>
                        <p className="mb-0 text-xs text-slate-400">
                            Portal Developer: <a href="https://izach.netlify.app/contact" target="_blank" rel="noopener noreferrer" className="text-[#E43A3A] hover:underline font-bold">izach</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
