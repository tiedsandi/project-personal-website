export default function AdminModal({
  open,
  title,
  onClose,
  children,
  maxWidth = "max-w-[600px]",
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-[#0d0d0d] border border-border w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-border sticky top-0 bg-[#0d0d0d] z-10">
          <div className="font-logo text-[22px] tracking-[1px]">{title}</div>
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition-colors text-[18px] cursor-pointer bg-transparent border-none"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
