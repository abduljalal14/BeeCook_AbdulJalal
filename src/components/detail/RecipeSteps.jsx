function RecipeSteps({ recipes }) {
    return (
        <ol className="mt-5 space-y-5">
            {(recipes ?? []).map((recipe, index) => (
                <li key={recipe.id} className="grid grid-cols-[40px_1fr] gap-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-secondary">
                        {recipe.sort_number || index + 1}
                    </span>
                    <p className="pt-1 text-base leading-6 text-secondary">{recipe.description}</p>
                </li>
            ))}
        </ol>
    );
}

export default RecipeSteps;
