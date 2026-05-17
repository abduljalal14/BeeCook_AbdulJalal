const nutritionFields = [
    { id: "calory", label: "Kalori" },
    { id: "protein", label: "Protein" },
    { id: "carbohydrate", label: "Karbohidrat" },
    { id: "fat", label: "Lemak" },
];

function NutritionForm({ nutrition, onChange }) {
    return (
        <div className="mt-7 rounded-lg bg-white p-8 shadow-[0_12px_26px_rgba(15,23,42,0.12)] md:p-10">
            <h2 className="text-2xl font-bold text-black">Nutrisi</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nutritionFields.map((field) => (
                    <label key={field.id} className="block">
                        <span className="text-sm font-bold text-secondary">{field.label}</span>
                        <input
                            type="number"
                            min="0"
                            value={nutrition[field.id]}
                            onChange={(event) => onChange(field.id, event.target.value)}
                            placeholder="0"
                            className="mt-3 h-11 w-full rounded-md border border-slate-200 px-4 text-base text-secondary outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

export default NutritionForm;
