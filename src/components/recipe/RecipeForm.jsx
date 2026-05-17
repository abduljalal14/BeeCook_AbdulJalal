import NutritionForm from "./NutritionForm";
import RecipeListSection from "./RecipeListSection";
import RecipeMainInfo from "./RecipeMainInfo";

function RecipeForm({
    form,
    categories,
    loadingCategories,
    submitting,
    onSubmit,
    onFieldChange,
    onNutritionChange,
    onListItemChange,
    onAddListItem,
    onRemoveListItem,
}) {
    return (
        <form onSubmit={onSubmit} className="mt-12">
            <RecipeMainInfo
                form={form}
                categories={categories}
                loadingCategories={loadingCategories}
                onFieldChange={onFieldChange}
            />

            <div className="mt-7 grid gap-7 lg:grid-cols-2">
                <RecipeListSection
                    title="Bahan - Bahan"
                    buttonLabel="Tambah Bahan"
                    field="ingredients"
                    items={form.ingredients}
                    placeholder="Bahan"
                    onAdd={onAddListItem}
                    onRemove={onRemoveListItem}
                    onChange={onListItemChange}
                />

                <RecipeListSection
                    title="Instruksi Masak"
                    buttonLabel="Tambah Instruksi"
                    field="recipes"
                    items={form.recipes}
                    placeholder="Instruksi"
                    onAdd={onAddListItem}
                    onRemove={onRemoveListItem}
                    onChange={onListItemChange}
                />
            </div>

            <NutritionForm nutrition={form.nutrition} onChange={onNutritionChange} />

            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    disabled={submitting}
                    className="h-[52px] min-w-[175px] rounded-md bg-primary px-8 text-base font-bold text-white transition hover:bg-[#d6a323] focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-primary/60"
                >
                    {submitting ? "Menyimpan..." : "Simpan Resep"}
                </button>
            </div>
        </form>
    );
}

export default RecipeForm;
