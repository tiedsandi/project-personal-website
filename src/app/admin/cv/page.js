"use client";

import { useState, useEffect, useRef } from "react";

export default function AdminCVPage() {
  const [cvUrl, setCvUrl] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(""); // pesan progress
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCV = () => {
    fetch("/api/cv")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) {
          setCvUrl(d.file_url || "");
          setUpdatedAt(d.updated_at);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCV();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Hanya file PDF yang diizinkan.");
      return;
    }
    setSelectedFile(file);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError("");
    setSuccess(false);
    setUploadProgress("Mengunggah ke storage...");

    const fd = new FormData();
    fd.append("file", selectedFile);

    const res = await fetch("/api/admin/cv/upload", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();

    if (!res.ok) {
      setUploading(false);
      setUploadProgress("");
      setError(data.error || "Upload gagal");
      return;
    }

    setUploadProgress("Menyimpan URL ke database...");

    const putRes = await fetch("/api/admin/cv", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_url: data.url }),
    });

    if (!putRes.ok) {
      setUploading(false);
      setUploadProgress("");
      setError("Gagal menyimpan URL");
      return;
    }

    setUploadProgress("Memperbarui tampilan...");
    setCvUrl(data.url);
    setUpdatedAt(new Date().toISOString());
    setSelectedFile(null);
    // reset input file
    if (fileInputRef.current) fileInputRef.current.value = "";

    setUploading(false);
    setUploadProgress("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Hanya file PDF.");
      return;
    }
    setSelectedFile(file);
    setError("");
  };

  return (
    <div className="p-10 max-w-[560px]">
      <div className="mb-8">
        <div className="text-[11px] tracking-[2px] uppercase text-accent mb-1">
          Master Data
        </div>
        <div className="font-logo text-[38px] tracking-[1px] leading-none">
          CV / RESUME
        </div>
        <p className="text-[12px] text-muted mt-1 font-light">
          Upload file PDF CV kamu. Akan otomatis dipakai di tombol "Unduh CV".
        </p>
      </div>

      {loading ? (
        <div className="h-32 bg-[#111] animate-pulse border border-border" />
      ) : (
        <div className="flex flex-col gap-5">
          {/* Status CV saat ini */}
          <div className="border border-border bg-[#0d0d0d] p-6">
            <div className="text-[10px] tracking-[2px] uppercase text-muted mb-3">
              CV Saat Ini
            </div>
            {cvUrl ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 border border-border text-[22px] flex-shrink-0">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-white truncate">
                    {cvUrl.split("/").pop()}
                  </div>
                  {updatedAt && (
                    <div className="text-[11px] text-muted mt-0.5">
                      Diupload:{" "}
                      {new Date(updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </div>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-accent border border-accent/40 px-3 py-1.5 hover:bg-accent/10 transition-colors flex-shrink-0"
                >
                  Buka ↗
                </a>
              </div>
            ) : (
              <div className="text-[13px] text-muted font-light">
                Belum ada CV yang diupload.
              </div>
            )}
          </div>

          {/* Upload area — drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`border border-dashed transition-colors p-10 text-center cursor-pointer group relative overflow-hidden ${
              uploading
                ? "border-accent/60 bg-accent/5 cursor-not-allowed"
                : selectedFile
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
            }`}
          >
            {uploading ? (
              /* Progress state */
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
                <div className="text-[13px] text-white">{uploadProgress}</div>
                <div className="text-[11px] text-muted">Mohon tunggu...</div>
              </div>
            ) : selectedFile ? (
              /* File terpilih, belum diupload */
              <div className="flex flex-col items-center gap-2">
                <div className="text-[28px]">📄</div>
                <div className="text-[13px] text-white font-medium truncate max-w-full px-4">
                  {selectedFile.name}
                </div>
                <div className="text-[11px] text-muted">
                  {(selectedFile.size / 1024).toFixed(0)} KB · Klik tombol
                  Upload untuk melanjutkan
                </div>
              </div>
            ) : (
              /* Default state */
              <div className="flex flex-col items-center gap-2">
                <div className="text-[32px] opacity-30 group-hover:opacity-60 transition-opacity">
                  ↑
                </div>
                <div className="text-[13px] text-white">
                  {cvUrl ? "Ganti CV" : "Upload CV"}
                </div>
                <div className="text-[11px] text-muted">
                  Drag & drop atau klik untuk pilih file PDF
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Tombol upload — muncul hanya jika file sudah dipilih */}
          {selectedFile && !uploading && (
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                className="bg-accent text-black text-[12px] tracking-[1px] uppercase px-6 py-2.5 cursor-pointer hover:opacity-85 transition-opacity flex-1"
              >
                Upload Sekarang
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="bg-transparent text-muted border border-border text-[12px] px-4 py-2.5 cursor-pointer hover:text-white transition-colors"
              >
                Batal
              </button>
            </div>
          )}

          {error && (
            <div className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5">
              {error}
            </div>
          )}
          {success && (
            <div className="text-[12px] text-accent bg-accent/10 border border-accent/20 px-4 py-2.5 flex items-center gap-2">
              <span>✓</span> CV berhasil diupload dan sudah aktif di website!
            </div>
          )}

          {/* Info bucket */}
          <div className="text-[11px] text-muted border border-border px-4 py-3 bg-[#0a0a0a]">
            File disimpan di Supabase Storage bucket{" "}
            <span className="text-white font-mono">pf-cv</span>. Pastikan bucket
            sudah dibuat dan bersifat <span className="text-white">public</span>
            .
          </div>
        </div>
      )}
    </div>
  );
}
