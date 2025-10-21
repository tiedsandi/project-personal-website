"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/authFirebase";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      window.location.href = "/admin/";
    } catch (err) {
      setError("Login gagal. Pastikan email & password benar.");
      toast.error("Login gagal. Pastikan email & password benar.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        {user ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <h2 className="mb-6 text-xl font-bold">Admin Panel</h2>
            <button
              onClick={handleLogout}
              className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-600 transition disabled:opacity-60"
              disabled={loading}
              style={{ minHeight: 44 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="mb-4 text-xl font-bold">Login Admin</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded"
              required
            />
            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
              style={{ minHeight: 44 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
