"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/authFirebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export function useLogout() {
  const router = useRouter();
  return async function logout() {
    await signOut(auth);
    router.replace("/login");
  };
}

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingSpinner label="" />;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
