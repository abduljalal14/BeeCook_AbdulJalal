import { Link, useParams } from "react-router-dom";
import categoryIcon from "../assets/category.svg";
import durationIcon from "../assets/duration.svg";
import DetailLoading from "../components/detail/DetailLoading";
import NutritionCards from "../components/detail/NutritionCards";
import RecipeSteps from "../components/detail/RecipeSteps";
import useMenuDetail from "../hooks/useMenuDetail";

const DEFAULT_SLUG = "es-teh-manis";

function Detail() {
    const { slug } = useParams();
    const { menu, loading, error } = useMenuDetail(slug || DEFAULT_SLUG);

    if (loading) {
        return <DetailLoading />;
    }

    if (error || !menu) {
        return (
            <main className="page-container pb-20 pt-10">
                <div className="rounded-lg border border-red-100 bg-red-50 px-6 py-8 text-center">
                    <h1 className="font-montserrat text-2xl font-bold text-red-700">Server down cuyy</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="relative overflow-hidden pb-20">
            <div className="pointer-events-none absolute -right-30 top-100 h-100 w-100 rounded-full bg-primary/30 blur-3xl -z-10"></div>
            <section className="page-container pt-6">
                <div
                    className="relative flex min-h-[300px] items-end overflow-hidden rounded-2xl bg-slate-200 bg-cover bg-center px-7 py-9 sm:min-h-[340px] sm:px-14"
                    style={{
                        backgroundImage: menu.imageUrl ? `url(${menu.imageUrl})` : undefined,
                    }}
                >
                    <div className="absolute inset-0 bg-secondary/50"></div>
                    <h1 className="relative z-10 max-w-3xl font-montserrat text-[clamp(30px,5vw,48px)] font-extrabold leading-tight text-white">
                        {menu.name}
                    </h1>
                </div>
            </section>

            <section className="page-container pt-7">
                <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
                    <div className="flex items-center gap-3">
                        <img src={categoryIcon} alt="" className="h-9 w-9" />
                        <div>
                            <p className="text-xs font-semibold text-slate-400">Kategori</p>
                            <p className="text-base font-bold text-secondary">{menu.category?.name ?? "Menu"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <img src={durationIcon} alt="" className="h-8 w-8" />
                        <div>
                            <p className="text-xs font-semibold text-slate-400">Durasi</p>
                            <p className="text-base font-bold text-secondary">{menu.cooking_duration} menit</p>
                        </div>
                    </div>
                </div>

                <p className="mt-8 max-w-none text-base leading-8 text-slate-500">{menu.description}</p>
            </section>

            <section className="page-container pt-11">
                <h2 className="font-montserrat text-2xl font-extrabold text-secondary">Informasi Nutrisi</h2>
                <NutritionCards nutrition={menu.nutritions ?? menu.nutrition} />
            </section>

            <section className="page-container grid gap-12 pt-20 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
                <div>
                    <h2 className="font-montserrat text-2xl font-extrabold text-secondary">Bahan-bahan</h2>
                    <ul className="mt-5 space-y-3 text-base leading-7 text-secondary">
                        {(menu.ingredients ?? []).map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.description}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-montserrat text-2xl font-extrabold text-secondary">Cara Masak</h2>
                    <RecipeSteps recipes={menu.recipes} />
                </div>
            </section>
        </main>
    );
}

export default Detail;
