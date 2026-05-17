function DetailLoading() {
    return (
        <main className="page-container pb-20 pt-6">
            <div className="h-[300px] animate-pulse rounded-2xl bg-slate-100"></div>
            <div className="mt-7 h-8 w-72 animate-pulse rounded bg-slate-100"></div>
            <div className="mt-8 grid gap-6 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-20 animate-pulse rounded-lg bg-slate-100"></div>
                ))}
            </div>
        </main>
    );
}

export default DetailLoading;
