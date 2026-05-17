import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import heroImage from "../assets/hero-image-list.webp";
import CategoryFilter from "../components/category/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import Pagination from "../components/pagination/Pagination";
import useCategory from "../hooks/useCategory";
import useMenu from "../hooks/useMenu";

const MENU_LIMIT = 9;

function List() {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategoryId = searchParams.get("category_id") ?? "";
    const [page, setPage] = useState(1);
    const { categories, loading: loadingCategories } = useCategory();
    const { menus, meta, loading: loadingMenus, error } = useMenu({
        page,
        limit: MENU_LIMIT,
        categoryId: selectedCategoryId,
    });

    const handleCategoryChange = (categoryId) => {
        const nextParams = new URLSearchParams(searchParams);

        if (categoryId) {
            nextParams.set("category_id", String(categoryId));
        } else {
            nextParams.delete("category_id");
        }

        setSearchParams(nextParams);
        setPage(1);
    };

    const currentPage = meta.currentPage || page;
    const totalPages = meta.totalPages || 1;

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;

        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="relative isolate overflow-hidden bg-white pb-16">
            <div className="pointer-events-none absolute -right-5 top-50 z-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl"></div>
            <section className="page-container relative z-10 pt-6">
                <div
                    className="relative min-h-[220px] overflow-hidden rounded-2xl bg-cover bg-center px-7 py-12 sm:min-h-[270px] sm:px-16 lg:px-20"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-secondary/55"></div>
                    <div className="relative z-10 flex h-full min-h-[130px] flex-col justify-center">
                        <p className="mb-2 text-lg font-bold text-primary">Sedang Trending</p>
                        <h1 className="font-montserrat text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-white">
                            Nasi Goreng Udang Mentega
                        </h1>
                    </div>
                </div>
            </section>

            <section className="page-container relative z-10 pt-8">
                <CategoryFilter
                    categories={categories}
                    loading={loadingCategories}
                    selectedCategoryId={selectedCategoryId}
                    onChange={handleCategoryChange}
                />
            </section>

            <section className="page-container relative z-10 pt-11">
                {error ? (
                    <div className="rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                        Server down cuyy.
                    </div>
                ) : null}

                <MenuGrid menus={menus} loading={loadingMenus} />

                {!loadingMenus && menus.length > 0 ? (
                    <div className="mt-14 flex flex-col items-center gap-5">
                        <p className="text-sm font-semibold text-slate-400">
                            Menampilkan {menus.length} dari {meta.totalItems} menu
                        </p>

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                ) : null}
            </section>
        </main>
    );
}

export default List;
