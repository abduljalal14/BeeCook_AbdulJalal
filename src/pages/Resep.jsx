import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Api from "../api";
import RecipeForm from "../components/recipe/RecipeForm";
import RecipeLoadingCard from "../components/recipe/RecipeLoadingCard";
import useCategory from "../hooks/useCategory";

const emptyForm = {
    name: "",
    category_id: "",
    cooking_duration: "",
    description: "",
    nutrition: {
        calory: "",
        protein: "",
        carbohydrate: "",
        fat: "",
    },
    ingredients: ["", "", ""],
    recipes: ["", "", ""],
};

const normalizeList = (items, minimumItems = 1) => {
    const values = items.map((item) => item.description ?? "").filter((item) => item.trim() !== "");

    while (values.length < minimumItems) {
        values.push("");
    }

    return values;
};

const buildPayload = (form) => ({
    name: form.name.trim(),
    description: form.description.trim(),
    cooking_duration: String(form.cooking_duration),
    category_id: String(form.category_id),
    nutritions: {
        calory: String(form.nutrition.calory || 0),
        protein: String(form.nutrition.protein || 0),
        carbohydrate: String(form.nutrition.carbohydrate || 0),
        fat: String(form.nutrition.fat || 0),
    },
    ingredients: form.ingredients
        .map((description) => description.trim())
        .filter(Boolean)
        .map((description) => ({ description })),
    recipes: form.recipes
        .map((description, index) => ({
            description: description.trim(),
            sort_number: String(index + 1),
        }))
        .filter((recipe) => recipe.description),
});

function Resep() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const menuId = searchParams.get("id");
    const isEditMode = Boolean(menuId);
    const { categories, loading: loadingCategories } = useCategory();
    const [form, setForm] = useState(emptyForm);
    const [loadingDetail, setLoadingDetail] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fillFormFromMenu = useCallback((menu) => {
        const nutritionData = menu.nutritions ?? menu.nutrition;
        setForm({
            name: menu.name ?? "",
            category_id: menu.category_id ? String(menu.category_id) : "",
            cooking_duration: menu.cooking_duration ? String(menu.cooking_duration) : "",
            description: menu.description ?? "",
            nutrition: {
                calory: nutritionData?.calory ? String(nutritionData.calory) : "",
                protein: nutritionData?.protein ? String(nutritionData.protein) : "",
                carbohydrate: nutritionData?.carbohydrate ? String(nutritionData.carbohydrate) : "",
                fat: nutritionData?.fat ? String(nutritionData.fat) : "",
            },
            ingredients: normalizeList(menu.ingredients ?? [], 3),
            recipes: normalizeList([...(menu.recipes ?? [])].sort((first, second) => first.sort_number - second.sort_number), 3),
        });
    }, []);

    useEffect(() => {
        let isMounted = true;

        if (!isEditMode) {
            Promise.resolve().then(() => {
                if (!isMounted) return;

                setLoadingDetail(false);
                setForm(emptyForm);
                setError("");
            });
            return () => {
                isMounted = false;
            };
        }

        Promise.resolve()
            .then(() => {
                if (!isMounted) return null;

                setLoadingDetail(true);
                setError("");
                return Api.get(`/menu/find/${menuId}`);
            })
            .then((response) => {
                if (!isMounted || !response) return;

                const menu = response.data?.data?.menu;

                if (!menu) {
                    setError("Data resep tidak ditemukan.");
                    return;
                }

                fillFormFromMenu(menu);
            })
            .catch(() => {
                if (!isMounted) return;

                setError("Server down cuyy.");
            })
            .finally(() => {
                if (!isMounted) return;

                setLoadingDetail(false);
            });

        return () => {
            isMounted = false;
        };
    }, [fillFormFromMenu, isEditMode, menuId]);

    const updateField = (field, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    };

    const updateNutrition = (field, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            nutrition: {
                ...currentForm.nutrition,
                [field]: value,
            },
        }));
    };

    const updateListItem = (field, index, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: currentForm[field].map((item, itemIndex) => (itemIndex === index ? value : item)),
        }));
    };

    const addListItem = (field) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: [...currentForm[field], ""],
        }));
    };

    const removeListItem = (field, index) => {
        setForm((currentForm) => {
            if (currentForm[field].length === 1) return currentForm;

            return {
                ...currentForm,
                [field]: currentForm[field].filter((_, itemIndex) => itemIndex !== index),
            };
        });
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Nama resep wajib diisi.";
        if (!form.category_id) return "Kategori wajib dipilih.";
        if (!form.cooking_duration || Number(form.cooking_duration) <= 0) return "Durasi masak wajib lebih dari 0 menit.";
        if (!form.description.trim()) return "Deskripsi wajib diisi.";
        if (!form.ingredients.some((ingredient) => ingredient.trim())) return "Minimal satu bahan wajib diisi.";
        if (!form.recipes.some((recipe) => recipe.trim())) return "Minimal satu instruksi wajib diisi.";

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationMessage = validateForm();

        if (validationMessage) {
            setError(validationMessage);
            setSuccess("");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            const payload = buildPayload(form);

            if (isEditMode) {
                await Api.patch(`/menu/update/${menuId}`, payload);
                setSuccess("Resep berhasil diperbarui.");
            } else {
                await Api.post("/menu", payload);
                setSuccess("Resep berhasil dibuat.");
                setForm(emptyForm);
            }

            setTimeout(() => {
                navigate("/kelola");
            }, 650);
        } catch {
            setError(isEditMode ? "Gagal memperbarui resep." : "Gagal membuat resep.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_62%,#fff3cb_100%)] pb-20 pt-8">
            <section className="page-container">
                <h1 className="font-montserrat text-[clamp(32px,4.7vw,44px)] font-extrabold leading-tight text-black">
                    {isEditMode ? "Edit Resep" : "Buat Resep Baru"}
                </h1>

                {error ? (
                    <div className="mt-8 rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                        {error}
                    </div>
                ) : null}

                {success ? (
                    <div className="mt-8 rounded-lg border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                        {success}
                    </div>
                ) : null}

                {loadingDetail ? (
                    <RecipeLoadingCard />
                ) : (
                    <RecipeForm
                        form={form}
                        categories={categories}
                        loadingCategories={loadingCategories}
                        submitting={submitting}
                        onSubmit={handleSubmit}
                        onFieldChange={updateField}
                        onNutritionChange={updateNutrition}
                        onListItemChange={updateListItem}
                        onAddListItem={addListItem}
                        onRemoveListItem={removeListItem}
                    />
                )}
            </section>
        </main>
    );
}

export default Resep;
