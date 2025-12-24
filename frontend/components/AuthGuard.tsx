"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

// Routes that logged-in users should not access (redirect to /home)
const publicAuthRoutes = ["/", "/login", "/create-account"];

// Routes that require login (if not listed here or in public routes, decide policy. 
// User asked to protect specific ones, but simpler to protect everything NOT public)
// Actually, let's exclude specific public routes and protect the rest.
// Public pages: Landing (/), Login, Create Account, About Us (Maybe), Privacy?
// Let's stick to the user's specific request: "if user is not login they cannot access Home, Explore Notes, Messages, Live Sessions, AI Assistant, My Profile, Upload, Settings"
const protectedRoutesPrefixes = [
    "/home",
    "/notes",
    "/explore",
    "/message",
    "/live",
    "/ai",
    "/profile",
    "/upload",
    "/setting",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        // 1. If logged in and trying to access public auth routes (login/signup/landing), go to home.
        if (user && publicAuthRoutes.includes(pathname)) {
            router.replace("/home");
            return;
        }

        // 2. If NOT logged in and trying to access protected routes, go to landing /.
        if (!user) {
            // Check if current path starts with any protected prefix
            const isProtected = protectedRoutesPrefixes.some(prefix => pathname.startsWith(prefix));
            if (isProtected) {
                router.replace("/");
            }
        }

    }, [user, loading, pathname, router]);

    // While loading auth state, show a generic loading spinner or nothing to avoid flash
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
            </div>
        );
    }

    return <>{children}</>;
}
