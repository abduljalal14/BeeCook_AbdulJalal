function RecipeMainInfo({ form, categories, loadingCategories, onFieldChange }) {
    return (
        <div className="rounded-lg bg-white p-8 shadow-[0_12px_26px_rgba(15,23,42,0.12)] md:p-10">
            <h2 className="text-2xl font-bold text-black">Informasi Utama</h2>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-5">
                    <label className="block">
                        <span className="text-sm font-bold text-secondary">Nama Resep</span>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) => onFieldChange("name", event.target.value)}
                            placeholder="Nama Resep"
                            className="mt-3 h-11 w-full rounded-md border border-slate-200 px-4 text-base text-secondary outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-bold text-secondary">Kategori</span>
                        <select
                            value={form.category_id}
                            onChange={(event) => onFieldChange("category_id", event.target.value)}
                            disabled={loadingCategories}
                            className="mt-3 h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-base text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-50"
                        >
                            <option value="">{loadingCategories ? "Memuat kategori..." : "Kategori"}</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm font-bold text-secondary">Durasi Masak</span>
                        <input
                            type="number"
                            min="1"
                            value={form.cooking_duration}
                            onChange={(event) => onFieldChange("cooking_duration", event.target.value)}
                            placeholder="60 menit"
                            className="mt-3 h-11 w-full rounded-md border border-slate-200 px-4 text-base text-secondary outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                    </label>
                </div>

                <label className="block">
                    <span className="text-sm font-bold text-secondary">Deskripsi</span>
                    <textarea
                        value={form.description}
                        onChange={(event) => onFieldChange("description", event.target.value)}
                        placeholder="Isi deskripsi singkat tentang makanan"
                        className="mt-3 h-[214px] w-full resize-none rounded-md border border-slate-200 px-4 py-4 text-base leading-6 text-secondary outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20"
                    ></textarea>
                </label>
            </div>
        </div>
    );
}

export default RecipeMainInfo;
