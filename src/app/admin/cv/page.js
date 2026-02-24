"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminCVPage() {
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleUpload(file) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Hanya file PDF yang diperbolehkan.");
      return;
    }

    setUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("cv", file);

    const res = await fetch("/api/cv", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage(data.message);
    } else {
      setStatus("error");
      setMessage(data.error || "Upload gagal");
    }
    setUploading(false);
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen CV</h1>
        <p className="text-sm text-gray-500 mt-1">Upload file PDF untuk mengganti CV yang ditampilkan</p>
      </div>

      {/* Current file info */}
      <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 mb-6">
        <FileText className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-700">cv.pdf</p>
          <p className="text-xs text-gray-400">File aktif di /public/cv.pdf</p>
        </div>
        <a
          href="/cv.pdf"
          target="_blank"
          className="ml-auto text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
        >
          Preview
        </a>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
          dragOver ? "border-gray-400 bg-gray-50" : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-700">Drag & drop file PDF di sini</p>
        <p className="text-xs text-gray-400 mt-1">atau klik untuk pilih file · maks 5MB</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </div>

      {/* Status */}
      {uploading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          Mengupload...
        </div>
      )}

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}
    </div>
  );
}
