"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

// Routes that are accessible without login
const publicAuthRoutes = ["/login", "/create-account"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        // 1. If logged in and trying to access public auth routes (login/signup), go to home.
        if (user && publicAuthRoutes.includes(pathname)) {
            router.replace("/home");
            return;
        }

        // 2. If NOT logged in and trying to access ANY page that is not public, go to login.
        if (!user && !publicAuthRoutes.includes(pathname)) {
            router.replace("/login");
        }

    }, [user, loading, pathname, router]);

    // While loading auth state, show a generic loading spinner
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
            </div>
        );
    }

    return <>{children}</>;
}
