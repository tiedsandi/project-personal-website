import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[120px] w-full fixed inset-0 z-50 bg-white/60">
      <FaSpinner className="mb-2 text-3xl text-blue-600 animate-spin" />
      <span className="text-base font-medium text-blue-700">{label}</span>
    </div>
  );
}
