"use client";

/**
 * AdminTable — generic sortable table shell
 *
 * Props:
 *  columns      — array of { key, label, sortable?, align?, hidden? }
 *                 align: "left" | "center" | "right" (default "left")
 *                 hidden: tailwind class string e.g. "hidden md:table-cell"
 *  data         — filtered + sorted rows (managed by parent)
 *  loading      — show skeleton when true
 *  emptyMessage — string shown when data is empty
 *  sortKey      — current sort column key
 *  sortDir      — "asc" | "desc"
 *  onSort       — (key) => void
 *  totalCount   — total items before filter (for footer)
 *  renderRow    — (row, index) => <tr>...</tr>
 *  skeletonRows — number of skeleton rows (default 6)
 */
export default function AdminTable({
  columns,
  data,
  loading,
  emptyMessage = "Tidak ada data.",
  sortKey,
  sortDir,
  onSort,
  totalCount,
  renderRow,
  skeletonRows = 6,
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border bg-[#0d0d0d]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-3 font-normal ${alignClass[col.align] || "text-left"} ${col.hidden || ""}`}
              >
                {col.sortable ? (
                  <button
                    onClick={() => onSort?.(col.key)}
                    className="text-[10px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none inline-flex items-center gap-0.5"
                  >
                    {col.label}
                    <SortIcon
                      colKey={col.key}
                      sortKey={sortKey}
                      sortDir={sortDir}
                    />
                  </button>
                ) : (
                  <span className="text-[10px] tracking-[1.5px] uppercase text-muted">
                    {col.label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                <td colSpan={columns.length} className="px-5 py-4">
                  <div className="h-4 bg-[#111] animate-pulse rounded w-2/3" />
                </td>
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-12 text-center text-muted text-[13px]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => renderRow(row, i))
          )}
        </tbody>
      </table>

      {!loading && data.length > 0 && (
        <div className="px-5 py-3 border-t border-border bg-[#0d0d0d] text-[11px] text-muted">
          Menampilkan {data.length}
          {totalCount != null &&
            totalCount !== data.length &&
            ` dari ${totalCount}`}{" "}
          data
        </div>
      )}
    </div>
  );
}

function SortIcon({ colKey, sortKey, sortDir }) {
  if (sortKey !== colKey) return <span className="text-[#333] ml-0.5">↕</span>;
  return (
    <span className="text-accent ml-0.5">{sortDir === "asc" ? "↑" : "↓"}</span>
  );
}
