const getPaginationItems = (currentPage, totalPages) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

function Pagination({ currentPage, totalPages, onPageChange, className = "" }) {
    if (totalPages <= 1) return null;

    return (
        <div className={`flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-secondary ${className}`}>
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-1 transition hover:text-primary disabled:cursor-not-allowed disabled:text-slate-300"
            >
                &laquo; Previous
            </button>

            {getPaginationItems(currentPage, totalPages).map((item, index) =>
                item === "..." ? (
                    <span key={`${item}-${index}`} className="px-1 text-slate-400">
                        ...
                    </span>
                ) : (
                    <button
                        type="button"
                        key={item}
                        onClick={() => onPageChange(item)}
                        className={`h-9 w-9 rounded-full transition ${
                            currentPage === item ? "bg-slate-200 text-secondary" : "hover:bg-slate-100 hover:text-primary"
                        }`}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-1 transition hover:text-primary disabled:cursor-not-allowed disabled:text-slate-300"
            >
                Next &raquo;
            </button>
        </div>
    );
}

export default Pagination;
