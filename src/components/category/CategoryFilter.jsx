function CategoryFilter({ categories, loading, selectedCategoryId, onChange }) {
    return (
        <div className="flex gap-6 overflow-x-auto pb-3">
            <button
                type="button"
                onClick={() => onChange("")}
                className={`h-16 min-w-40 rounded-lg px-8 text-sm font-bold transition ${
                    selectedCategoryId === "" ? "bg-primary text-white" : "bg-secondary text-white hover:bg-slate-800"
                }`}
            >
                Semua
            </button>

            {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="h-16 min-w-40 animate-pulse rounded-lg bg-slate-100"></div>
                  ))
                : categories.map((category) => (
                      <button
                          type="button"
                          key={category.id}
                          onClick={() => onChange(category.id)}
                          className={`h-16 min-w-40 rounded-lg px-8 text-sm font-bold transition ${
                              selectedCategoryId === String(category.id)
                                  ? "bg-primary text-white"
                                  : "bg-secondary text-white hover:bg-slate-800"
                          }`}
                      >
                          {category.name}
                      </button>
                  ))}
        </div>
    );
}

export default CategoryFilter;
