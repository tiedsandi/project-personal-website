export function formatBulanTahun(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";
  return date.toLocaleString("id-ID", { month: "long", year: "numeric" });
}

export function formatPeriode(start, end, isCurrent) {
  const startStr = formatBulanTahun(start);
  const endStr = isCurrent ? "Sekarang" : formatBulanTahun(end);
  return `${startStr} - ${endStr}`;
}
