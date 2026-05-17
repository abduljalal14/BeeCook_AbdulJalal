const formatNutrition = (nutrition) => [
    {
        label: "Kalori",
        value: `${nutrition?.calory ?? 0} kcal`,
    },
    {
        label: "Protein",
        value: `${nutrition?.protein ?? 0}g`,
    },
    {
        label: "Lemak",
        value: `${nutrition?.fat ?? 0}g`,
    },
    {
        label: "Karbohidrat",
        value: `${nutrition?.carbohydrate ?? 0}g`,
    },
];

function NutritionCards({ nutrition }) {
    return (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formatNutrition(nutrition).map((item) => (
                <div key={item.label} className="rounded-lg border-2 border-primary bg-tertiary px-6 py-4 text-center">
                    <p className="text-2xl font-extrabold text-slate-700">{item.value}</p>
                    <p className="mt-1 text-sm font-medium text-secondary">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

export default NutritionCards;
