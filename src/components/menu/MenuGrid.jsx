import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";

function MenuGrid({ menus, loading }) {
    if (loading) {
        return (
            <div className="grid gap-x-9 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MenuCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (menus.length === 0) {
        return (
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-5 py-10 text-center">
                <h2 className="font-montserrat text-2xl font-bold text-secondary">Menu belum tersedia</h2>
                <p className="mt-2 text-base text-slate-500">Tidak ada menu untuk kategori ini.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-x-9 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {menus.map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
            ))}
        </div>
    );
}

export default MenuGrid;
