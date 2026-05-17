import { Link } from "react-router-dom";
import durationIcon from "../../assets/duration.svg";

function MenuCard({ menu }) {
    return (
        <Link
            to={`/detail/${menu.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-2xl transition hover:-translate-y-1 hover:shadow-3xl"
        >
            <div
                className="aspect-[1.42/1] bg-slate-100 bg-cover bg-center"
                style={{
                    backgroundImage: menu.imageUrl ? `url(${menu.imageUrl})` : undefined,
                }}
            ></div>

            <div className="p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        {menu.category?.name ?? "Menu"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                        <img src={durationIcon} alt="" className="h-4 w-4" />
                        {menu.cooking_duration} m
                    </span>
                </div>

                <h2 className="line-clamp-2 min-h-12 text-lg font-extrabold leading-snug text-secondary transition group-hover:text-primary">
                    {menu.name}
                </h2>
            </div>
        </Link>
    );
}

export default MenuCard;
