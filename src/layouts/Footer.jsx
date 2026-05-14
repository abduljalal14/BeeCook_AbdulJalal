import LogoBW from "../components/LogoBW";
import FacebookIcon from "../assets/sosmed/socmed-facebook.png";
import InstagramIcon from "../assets/sosmed/socmed-instagram.png";
import TikTokIcon from "../assets/sosmed/socmed-tiktok.png";
import xIcon from "../assets/sosmed/socmed-x.png";

function Footer() {
    return (
        <footer className="bg-secondary text-tertiary pt-16 pb-10 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    {/* Logo Section */}
                    <div>
                        <LogoBW />
                    </div>

                    {/* Links Sections */}
                    <div className="flex flex-wrap gap-x-12 lg:gap-x-24 gap-y-8 font-inter">
                        <div>
                            <h3 className="text-xl font-bold mb-6">Partnership</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-primary">Layanan</a></li>
                                <li><a href="#" className="hover:text-primary">Kontributor</a></li>
                                <li><a href="#" className="hover:text-primary">Iklan</a></li>
                                <li><a href="#" className="hover:text-primary">Karir</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6">Bantuan</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                                <li><a href="#" className="hover:text-primary">Kontak Kami</a></li>
                                <li><a href="#" className="hover:text-primary">Aksesibilitas</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Socmed Secion */}
                    <div className="flex gap-x-4">
                        <a href="#">
                            <img className="w-10" src={FacebookIcon} alt="Facebook" />
                        </a>
                        <a href="#">
                            <img className="w-10" src={InstagramIcon} alt="Instagram" />
                        </a>
                        <a href="#">
                            <img className="w-10" src={TikTokIcon} alt="TikTok" />
                        </a>
                        <a href="#">
                            <img className="w-10" src={xIcon} alt="X" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 pt-8">
                    <p className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                        BEECOOK MEDIA | ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer