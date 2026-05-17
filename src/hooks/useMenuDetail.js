import { useCallback, useEffect, useState } from "react";
import Api from "../api";
import { getImageUrl } from "../utils/imageUtils";

const normalizeMenuDetail = (menu) => {
    if (!menu) return null;

    return {
        ...menu,
        imageUrl: getImageUrl(menu.file_id),
        recipes: [...(menu.recipes ?? [])].sort((firstRecipe, secondRecipe) => {
            return firstRecipe.sort_number - secondRecipe.sort_number;
        }),
    };
};

const loadMenuDetail = async (slug) => {
    const response = await Api.get(`/menu/detail/${slug}`);

    return normalizeMenuDetail(response.data?.data?.menu);
};

function useMenuDetail(slug) {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataMenuDetail = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            setMenu(await loadMenuDetail(slug));
        } catch (err) {
            setError(err);
            setMenu(null);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        let isMounted = true;

        loadMenuDetail(slug)
            .then((menuData) => {
                if (!isMounted) return;

                setMenu(menuData);
                setError(null);
            })
            .catch((err) => {
                if (!isMounted) return;

                setError(err);
                setMenu(null);
            })
            .finally(() => {
                if (!isMounted) return;

                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return {
        menu,
        loading,
        error,
        fetchDataMenuDetail,
    };
}

export default useMenuDetail;
