import { Link } from "react-router-dom";

function ManageMenuTable({ menus, loading, menuLimit, deletingId, onDelete, onUploadImage }) {
    return (
        <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500">Nama Resep</th>
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500">Kategori</th>
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500">File ID</th>
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? Array.from({ length: menuLimit }).map((_, index) => (
                              <tr key={index} className="border-b border-slate-200">
                                  <td className="px-4 py-5">
                                      <div className="h-4 w-48 animate-pulse rounded bg-slate-100"></div>
                                  </td>
                                  <td className="px-4 py-5">
                                      <div className="h-4 w-28 animate-pulse rounded bg-slate-100"></div>
                                  </td>
                                  <td className="px-4 py-5">
                                      <div className="h-4 w-36 animate-pulse rounded bg-slate-100"></div>
                                  </td>
                                  <td className="px-4 py-5">
                                      <div className="h-4 w-32 animate-pulse rounded bg-slate-100"></div>
                                  </td>
                              </tr>
                          ))
                        : null}

                    {!loading
                        ? menus.map((menu) => (
                              <tr key={menu.id} className="border-b border-slate-200">
                                  <td className="px-4 py-5 text-sm font-medium text-secondary">{menu.name}</td>
                                  <td className="px-4 py-5 text-sm font-medium text-secondary">
                                      {menu.category?.name ?? "-"}
                                  </td>
                                  <td className="px-4 py-5 text-sm font-medium text-secondary">{menu.file_id || "-"}</td>
                                  <td className="px-4 py-5">
                                      <div className="flex items-center gap-3 text-sm font-bold">
                                          <button
                                              type="button"
                                              onClick={() => onDelete(menu)}
                                              disabled={deletingId === menu.id}
                                              className="text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:text-red-300"
                                          >
                                              {deletingId === menu.id ? "..." : "Del"}
                                          </button>
                                          <Link to={`/resep?id=${menu.id}`} className="text-blue-600 transition hover:text-blue-800">
                                              Edit
                                          </Link>
                                          <button
                                              type="button"
                                              onClick={() => onUploadImage(menu)}
                                              className="text-teal-500 transition hover:text-teal-700"
                                          >
                                              Gambar
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
        </div>
    );
}

export default ManageMenuTable;
