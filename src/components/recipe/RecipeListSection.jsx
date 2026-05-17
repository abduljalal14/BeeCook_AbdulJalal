function RecipeListSection({ title, buttonLabel, field, items, placeholder, onAdd, onRemove, onChange }) {
    return (
        <div className="rounded-lg bg-white p-8 shadow-[0_12px_26px_rgba(15,23,42,0.12)] md:p-10">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-black">{title}</h2>
                <button
                    type="button"
                    onClick={() => onAdd(field)}
                    className="h-8 rounded-md border border-slate-200 px-4 text-xs font-semibold text-secondary transition hover:bg-slate-50"
                >
                    {buttonLabel}
                </button>
            </div>

            <div className="mt-7 space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(event) => onChange(field, index, event.target.value)}
                            placeholder={`${placeholder} ${index + 1}`}
                            className="h-11 min-w-0 flex-1 rounded-md border border-slate-200 px-4 text-base text-secondary outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(field, index)}
                            disabled={items.length === 1}
                            className="h-11 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                            aria-label={`Hapus ${placeholder.toLowerCase()} ${index + 1}`}
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeListSection;
