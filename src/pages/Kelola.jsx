import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../api";
import ManageMenuTable from "../components/manage/ManageMenuTable";
import UploadImageModal from "../components/modal/UploadImageModal";
import SimplePagination from "../components/pagination/SimplePagination";
import useMenu from "../hooks/useMenu";

const MENU_LIMIT = 4;
const MAX_IMAGE_SIZE = 50 * 1024 * 1024;

function Kelola() {
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const { menus, meta, loading, error, fetchDataMenus } = useMenu({
        page,
        limit: MENU_LIMIT,
    });

    const currentPage = meta.currentPage || page;
    const totalPages = meta.totalPages || 1;

    useEffect(() => {
        return () => {
            if (previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;

        setPage(nextPage);
    };

    const openUploadModal = (menu) => {
        setSelectedMenu(menu);
        setSelectedImage(null);
        setPreviewUrl(menu.imageUrl || "");
        setUploadError("");
    };

    const closeUploadModal = () => {
        setSelectedMenu(null);
        setSelectedImage(null);
        setPreviewUrl("");
        setUploadError("");
        setUploading(false);
    };

    const handleImageChange = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setUploadError("File harus berupa gambar.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setUploadError("Ukuran gambar maksimal 50MB.");
            return;
        }

        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setUploadError("");
    };

    const handleUpload = async () => {
        if (!selectedMenu || !selectedImage) {
            setUploadError("Pilih gambar terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            setUploading(true);
            setUploadError("");
            await Api.post(`/menu/upload/${selectedMenu.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            closeUploadModal();
            fetchDataMenus();
        } catch {
            setUploadError("Gagal mengupload gambar. Silakan coba lagi.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (menu) => {
        const confirmed = window.confirm(`Hapus resep "${menu.name}"?`);

        if (!confirmed) return;

        try {
            setDeletingId(menu.id);
            await Api.delete(`/menu/${menu.id}`);

            if (menus.length === 1 && currentPage > 1) {
                setPage(currentPage - 1);
            } else {
                fetchDataMenus();
            }
        } catch {
            window.alert("Gagal menghapus resep. Silakan coba lagi.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="bg-white pb-20 pt-6">
            <section className="page-container">
                <h1 className="font-montserrat text-[clamp(34px,5vw,44px)] font-extrabold leading-tight text-black">
                    Kelola Resep
                </h1>

                <Link
                    to="/resep"
                    className="mt-12 inline-flex h-[52px] min-w-[190px] items-center justify-center rounded-md bg-primary px-8 text-base font-bold text-white transition hover:bg-[#d6a323] focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                    Tambah Resep
                </Link>

                <ManageMenuTable
                    menus={error ? [] : menus}
                    loading={loading}
                    menuLimit={MENU_LIMIT}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                    onUploadImage={openUploadModal}
                />

                {!loading && error ? (
                    <div className="mt-8 rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                        Server down cuyy.
                    </div>
                ) : null}

                {!loading && !error && menus.length === 0 ? (
                    <div className="mt-8 rounded-lg border border-slate-100 bg-slate-50 px-5 py-10 text-center">
                        <h2 className="font-montserrat text-2xl font-bold text-secondary">Resep belum tersedia</h2>
                        <p className="mt-2 text-base text-slate-500">Tambahkan resep pertama untuk mulai mengelola data.</p>
                    </div>
                ) : null}

                {!loading && !error && menus.length > 0 ? (
                    <SimplePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                ) : null}
            </section>

            {selectedMenu ? (
                <UploadImageModal
                    previewUrl={previewUrl}
                    uploading={uploading}
                    uploadError={uploadError}
                    onClose={closeUploadModal}
                    onFileChange={handleImageChange}
                    onUpload={handleUpload}
                />
            ) : null}
        </main>
    );
}

export default Kelola;
