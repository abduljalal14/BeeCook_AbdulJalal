import { useCallback, useEffect, useState } from "react";
import Api from "../api";
import { getImageUrl } from "../utils/imageUtils";

const loadCategories = async () => {
    const response = await Api.get("/category?search=");
    const categoryData = response.data?.data?.categories ?? [];

    return categoryData.map((category) => ({
        ...category,
        imageUrl: getImageUrl(category.file_id),
    }));
};

function useCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            setCategories(await loadCategories());
        } catch (err) {
            setError(err);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        loadCategories()
            .then((categoryData) => {
                if (!isMounted) return;

                setCategories(categoryData);
                setError(null);
            })
            .catch((err) => {
                if (!isMounted) return;

                setError(err);
                setCategories([]);
            })
            .finally(() => {
                if (!isMounted) return;

                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        categories,
        loading,
        error,
        fetchDataCategories,
    };
}

export default useCategory;
