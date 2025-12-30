"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

/* 
  1. DEFINE TYPES
  These tell TypeScript what kind of data we expect for the user and the context.
*/

type Provider = "google" | "github";

type UserInfo = {
  id: string;
  email: string;
  name: string;
  provider?: string;
};

type AuthContextType = {
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<boolean>; //  =>Promise<boolean>;kunai ni vallue na xodos  veneyara
  login: (email: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: Provider) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  deleteAccount: () => Promise<{ success: boolean; message: string }>;
};

/* 
  2. CREATE CONTEXT
  This acts as the container for our auth data so any component can access it.
*/
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* 
  3. SETUP EXTERNAL SERVICES 
  Initialize Supabase and define the Backend URL.
*/
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

/* 
  4. AUTH PROVIDER COMPONENT
  This component wraps our app and manages the authentication state (user, token, loading).
*/
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- State Variables ---
  const [user, setUser] = useState<UserInfo | null>(null); // Current user
  const [token, setToken] = useState<string | null>(null); // JWT token
  // Start loading as true so we can check if the user is already logged in before showing the page
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // --- Helper Functions to Manage Local Storage ---
  const saveSession = (newToken: string, newUser: UserInfo) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  // --- Initialization Effect ---
  // This runs once when the app starts to check if we are logged in
  useEffect(() => {
    // 1. Check Local Storage for existing session
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    // 2. Listen for Supabase Login Events (e.g., when returning from Google Login)
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   if (event === "SIGNED_IN" && session) {
    //     /* 
    //        If Supabase says we are signed in, we need to tell our Backend 
    //        so it can creating/finding the user in MongoDB.
    //     */
    //     const accessToken = session.access_token;
    //     try {
    //       const { data } = await axios.post(
    //         `${BACKEND_URL}/api/user/supabase-login`,
    //         { access_token: accessToken }
    //       );

    //       if (data.success && data.token && data.user) {
    //         saveSession(data.token, data.user);
    //       }
    //     } catch (error) {
    //       console.error("Sync with backend failed:", error);
    //     }
    //   } else if (event === "SIGNED_OUT") {
    //     clearSession();
    //   }
    // });

    // // Finished loading
    // setLoading(false);

    // // Cleanup function to remove listener when component unmounts
    // return () => {
    //   subscription.unsubscribe();
    // };
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const accessToken = session.access_token;
        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/user/supabase-login`,
            { access_token: accessToken }
          );
          if (data.success && data.token && data.user)
            saveSession(data.token, data.user);
        } catch (error) {
          console.error("Sync with backend failed:", error);
        }
      } else if (event === "SIGNED_OUT") clearSession();
    });

    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  // --- Auth Actions ---

  // 1. Register with Email/Password
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/user/register`, {
        name,
        email,
        password,
      });

      if (data.success && data.token && data.user) {
        saveSession(data.token, data.user);
        return true; // Success
      }
      return false; // Failed
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 2. Login with Email/Password
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/user/login`, {
        email,
        password,
      });

      if (data.success && data.token && data.user) {
        saveSession(data.token, data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 3. Login with Google / GitHub (Supabase)
  const loginWithProvider = async (provider: Provider) => {
    setLoading(true); // Don't turn off loading here, redirects might happen
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin, // Come back to this site after login
        },
      });

      if (error) {
        console.error("Provider login error:", error);
        setLoading(false); // Stop loading if there was an error preventing redirect
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    }
    // Note: If successful, the page redirects, so we don't set loading(false) immediately
  };

  // 4. Logout
  const logout = async () => {
    clearSession();
    await supabase.auth.signOut();
  };

  // 5. Change Password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/change-password`,
        { currentPassword, newPassword },
        { headers: { token: token } }
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  // 6. Delete Account
  const deleteAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/api/user/delete`, {
        headers: { token: token },
      });
      if (data.success) {
        logout(); // Logout after correct deletion
      }
      return data;
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  // --- Render Provider ---
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        loginWithProvider,
        logout,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* 
  5. CUSTOM HOOK 
  This generic hook makes it easy to use the auth context in any component.
  Usage: const { user, login } = useAuth();
*/
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
