export default function AdminPageHeader({
  label,
  title,
  subtitle,
  onAdd,
  addLabel,
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="text-[11px] tracking-[2px] uppercase text-accent mb-1">
          {label}
        </div>
        <div className="font-logo text-[38px] tracking-[1px] leading-none">
          {title}
        </div>
        {subtitle && (
          <p className="text-[12px] text-muted mt-1 font-light">{subtitle}</p>
        )}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="bg-accent text-black text-[12px] tracking-[1px] uppercase px-5 py-2.5 cursor-pointer hover:opacity-85 transition-opacity"
        >
          {addLabel || "+ Tambah"}
        </button>
      )}
    </div>
  );
}
