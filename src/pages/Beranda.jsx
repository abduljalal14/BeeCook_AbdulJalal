import { Link } from "react-router-dom";
import Button from "../components/Button";
import avatar1 from "../assets/avatar/people1.png"
import avatar2 from "../assets/avatar/people2.png"
import avatar3 from "../assets/avatar/people3.png"
import heroBG from "../assets/hero-image.webp";
import chefSubs from "../assets/people-chef-subscribe.webp";

import stars from "../assets/stars.webp";
import line from "../assets/line-doodle.webp";
import email from "../assets/email-icon.svg";
import useCategory from "../hooks/useCategory";


function Beranda() {
    const { categories, loading } = useCategory();

    return (
        <main className="overflow-hidden">

            {/* Hero Section */}
            <section className="relative isolate bg-white">
                <div className="pointer-events-none absolute left-0 top-56 z-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl"></div>

                <div className="page-container relative z-10 grid min-h-[520px] items-center gap-10 py-8 md:grid-cols-[0.95fr_1.05fr] md:py-12 lg:min-h-[610px]">
                    <div className="relative z-10">
                        <h1 className="font-montserrat text-[clamp(32px,7vw,74px)] font-semibold leading-[0.96] tracking-normal text-secondary">
                            <span className="block whitespace-nowrap">
                                <span>Where </span>
                                <span className="relative inline-block font-extrabold text-primary">
                                    Quality
                                    <img src={stars} alt="" className="absolute -right-8 -top-6 w-10 sm:-right-12 sm:-top-9 sm:w-16" />
                                </span>
                            </span>
                            <span className="block whitespace-nowrap text-[clamp(20px,7vw,54px)]">
                                <span>Meets </span>
                                <span className="font-extrabold">Flavor.</span>
                            </span>
                        </h1>

                        <Link to="/list">
                            <Button text="Eksplor Sekarang" className="mt-7" />
                        </Link>
                        
                        <div className="mt-9 flex items-center gap-x-4">
                            <div className="flex">
                                <img className="h-11 w-11 rounded-full object-cover z-20" src={avatar1} alt="Pengguna BeeCook 1" />
                                <img className="-ml-2 h-11 w-11 rounded-full object-cover z-10" src={avatar2} alt="Pengguna BeeCook 2" />
                                <img className="-ml-2 h-11 w-11 rounded-full object-cover" src={avatar3} alt="Pengguna BeeCook 3" />
                            </div>
                            <p className="text-sm font-semibold text-secondary sm:text-base">1.000+ Pengguna</p>
                        </div>
                    </div>

                    <div className="relative min-h-[260px] md:min-h-[430px]">
                        <img
                            src={heroBG}
                            alt="Spaghetti seafood BeeCook"
                            className="absolute left-1/2 top-1/2 w-[min(720px,145%)] max-w-none -translate-x-[43%] -translate-y-1/2 object-contain md:-translate-x-[36%] lg:w-[760px]"
                        />
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="section-spacing relative isolate">
                <div className="pointer-events-none absolute -right-5 top-20 z-0 h-90 w-90 rounded-full bg-primary/30 blur-3xl"></div>

                <div className="page-container relative z-10">
                    <div className="relative mx-auto mb-12 w-fit text-center">
                        <h2 className="section-title">Eksplor Berdasarkan <span className="text-primary">Kategori</span></h2>
                        <img src={line} alt="" className="absolute -right-4 -bottom-5 w-40 sm:w-56" />
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="flex flex-col items-center justify-center text-center">
                                    <div className="h-24 w-24 animate-pulse rounded-full bg-slate-100 sm:h-28 sm:w-28 lg:h-32 lg:w-32"></div>
                                    <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-100"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
                            {categories.map((category) => (
                                <Link
                                    to={`/list?category_id=${category.id}`}
                                    key={category.id}
                                    className="group flex flex-col items-center justify-center text-center"
                                >
                                    <div
                                        className="h-24 w-24 rounded-full bg-white bg-cover bg-center shadow-[0_10px_30px_rgba(17,24,39,0.08)] transition group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(17,24,39,0.14)] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                                        style={{
                                            backgroundImage: category.imageUrl ? `url(${category.imageUrl})` : undefined,
                                        }}
                                    ></div>
                                    <h3 className="mt-4 text-sm font-bold text-secondary transition group-hover:text-primary sm:text-base">{category.name}</h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Subscription Email section */}
            <section className="section-spacing pt-4">
                <div className="page-container grid items-center gap-10 md:grid-cols-[1fr_0.72fr]">
                    <div className="max-w-xl">
                        <h2 className="font-montserrat text-3xl font-semibold text-secondary">Dapatkan menu menarik setiap hari</h2>
                        <p className="section-copy mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <form className="mt-7 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <img src={email} alt="" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="email"
                                    placeholder="you@email.com"
                                    className="w-full min-h-12 rounded-md border border-slate-200 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <Button text="Langganan" type="submit" className="min-h-12 sm:px-9" />
                        </form>
                    </div>

                    <div className="mx-auto relative isolate aspect-[0.82/1] w-full h-135 max-w-[320px] items-end justify-center overflow-hidden rounded-full bg-primary sm:max-w-[360px]">
                        <div className="pointer-events-none absolute left-0 bottom-0 z-0 h-72 w-72 rounded-full bg-tertiary blur-3xl"></div>
                        <img src={chefSubs} alt="Chef BeeCook" className="absolute bottom-0 left-1/2 z-10 w-3/4 object-cover object-bottom translate-x-[-50%] translate-y-4" />
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Beranda
