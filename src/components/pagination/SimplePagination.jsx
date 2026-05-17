function SimplePagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 0) return null;

    return (
        <div className="mt-3 flex items-center gap-4 px-4 text-sm font-semibold text-secondary">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="transition hover:text-primary disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label="Halaman sebelumnya"
            >
                &laquo;
            </button>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white">
                {currentPage}
            </span>

            <span className="text-slate-500">of</span>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="transition hover:text-primary disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label="Halaman berikutnya"
            >
                {totalPages} &raquo;
            </button>
        </div>
    );
}

export default SimplePagination;
