import { useEffect } from "react";

export default function Toast({ message, type = "success", show, onClose, duration = 2500 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed z-50 top-6 right-6 px-4 py-2 rounded shadow-lg text-white transition-all animate-fade-in-down
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      role="alert"
    >
      {message}
    </div>
  );
}
