import { useCallback, useEffect, useState } from "react";
import Api from "../api";
import { getImageUrl } from "../utils/imageUtils";

const normalizeMenus = (menus) => {
    return menus.map((menu) => ({
        ...menu,
        imageUrl: getImageUrl(menu.file_id),
    }));
};

const loadMenus = async ({ page, limit, search, categoryId }) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        category_id: categoryId ? String(categoryId) : "",
    });

    const response = await Api.get(`/menu?${params.toString()}`);
    const menuData = response.data?.data;

    return {
        menus: normalizeMenus(menuData?.menus ?? []),
        meta: {
            totalItems: menuData?.totalItems ?? 0,
            totalPages: menuData?.totalPages ?? 1,
            currentPage: menuData?.currentPage ?? page,
            itemsPerPage: menuData?.itemsPerPage ?? limit,
        },
    };
};

function useMenu({ page = 1, limit = 15, search = "", categoryId = "" } = {}) {
    const [menus, setMenus] = useState([]);
    const [meta, setMeta] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: page,
        itemsPerPage: limit,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataMenus = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const menuData = await loadMenus({ page, limit, search, categoryId });

            setMenus(menuData.menus);
            setMeta(menuData.meta);
        } catch (err) {
            setError(err);
            setMenus([]);
        } finally {
            setLoading(false);
        }
    }, [categoryId, limit, page, search]);

    useEffect(() => {
        let isMounted = true;

        loadMenus({ page, limit, search, categoryId })
            .then((menuData) => {
                if (!isMounted) return;

                setMenus(menuData.menus);
                setMeta(menuData.meta);
                setError(null);
            })
            .catch((err) => {
                if (!isMounted) return;

                setError(err);
                setMenus([]);
            })
            .finally(() => {
                if (!isMounted) return;

                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [categoryId, limit, page, search]);

    return {
        menus,
        meta,
        loading,
        error,
        fetchDataMenus,
    };
}

export default useMenu;
