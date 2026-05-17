function RecipeLoadingCard() {
    return (
        <div className="mt-12 rounded-lg bg-white p-10 shadow-[0_12px_26px_rgba(15,23,42,0.12)]">
            <div className="h-5 w-48 animate-pulse rounded bg-slate-100"></div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-5">
                    <div className="h-12 animate-pulse rounded-md bg-slate-100"></div>
                    <div className="h-12 animate-pulse rounded-md bg-slate-100"></div>
                    <div className="h-12 animate-pulse rounded-md bg-slate-100"></div>
                </div>
                <div className="h-40 animate-pulse rounded-md bg-slate-100"></div>
            </div>
        </div>
    );
}

export default RecipeLoadingCard;
