"use client";
import Skeleton from "./Skeleton";

/**
 * TableWithSkeleton
 * @param {Object} props
 * @param {Array} props.columns - Array of { key, label, className }
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Show skeleton if true
 * @param {number} props.skeletonRows - Number of skeleton rows
 * @param {function} props.renderRow - Function (row, idx) => <tr>...</tr>
 * @param {string} props.className - Table className
 * @param {React.ReactNode} props.footer - Optional table footer
 * @param {number} props.page - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Function to change page
 */
export default function TableWithSkeleton({
  columns = [],
  data = [],
  loading = false,
  skeletonRows = 3,
  renderRow,
  className = "",
  footer,
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full bg-white border rounded-xl ${className}`}>
        <thead>
          <tr className="bg-zinc-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-2 text-left ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? [...Array(skeletonRows)].map((_, i) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td key={j} className="p-2">
                      <Skeleton className="w-full h-4 rounded" />
                    </td>
                  ))}
                </tr>
              ))
            : data.length === 0
            ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-4 text-center text-zinc-400"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              )
            : data.map((row, idx) => renderRow(row, idx))}
        </tbody>
        {footer && <tfoot>{footer}</tfoot>}
      </table>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-zinc-700">
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
