export default function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[1.5px] uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
