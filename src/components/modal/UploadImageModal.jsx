import ImageUpload from "../../assets/image-upload.png";
import ImagePreviewPlaceholder from "../../assets/image-preview.svg";

function UploadImageModal({ previewUrl, uploading, uploadError, onClose, onFileChange, onUpload }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-6">
            <div className="w-full max-w-[385px] overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgba(15,23,42,0.24)]">
                <div className="relative px-8 pb-4 pt-7 text-center">
                    <h2 className="font-montserrat text-xl font-bold text-secondary">Upload Gambar</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={uploading}
                        className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-lg leading-none text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed"
                        aria-label="Tutup modal upload gambar"
                    >
                        &times;
                    </button>
                </div>

                <div className="px-8 pb-7">
                    <label
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                            event.preventDefault();
                            onFileChange(event.dataTransfer.files?.[0]);
                        }}
                        className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white px-5 text-center transition hover:border-blue-400"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(event) => onFileChange(event.target.files?.[0])}
                            disabled={uploading}
                        />
                        <div className="mb-4 text-blue-600">
                            <img src={ImageUpload} alt="Icon upload" className="h-10" />
                        </div>
                        <p className="text-base font-medium text-secondary">
                            Drop your files here or <span className="font-bold text-blue-600">browse</span>
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Maximum size: 50MB</p>
                    </label>

                    <div className="mt-3">
                        <p className="mb-1 text-sm font-medium text-secondary">Preview</p>
                        <div className="flex h-[193px] items-center justify-center overflow-hidden rounded-md bg-slate-50">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview gambar resep" className="h-full w-full object-cover" />
                            ) : (
                                <div className="text-slate-400">
                                    <img src={ImagePreviewPlaceholder} alt="Placeholder" />
                                </div>
                            )}
                        </div>
                    </div>

                    {uploadError ? <p className="mt-3 text-sm font-semibold text-red-600">{uploadError}</p> : null}
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={uploading}
                        className="h-9 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-secondary transition hover:bg-slate-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={uploading}
                        className="h-9 rounded-md bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadImageModal;
