function MenuCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_15px_35px_rgba(17,24,39,0.16)]">
            <div className="aspect-[1.42/1] animate-pulse bg-slate-100"></div>
            <div className="space-y-4 p-5">
                <div className="h-5 w-28 animate-pulse rounded bg-slate-100"></div>
                <div className="h-5 w-full animate-pulse rounded bg-slate-100"></div>
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100"></div>
            </div>
        </div>
    );
}

export default MenuCardSkeleton;
