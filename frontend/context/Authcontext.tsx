// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

type Provider = "google" | "github";

type UserInfo = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: Provider) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const u = localStorage.getItem("auth_user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const saveSession = (t: string, u: UserInfo) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  // Normal register
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
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Normal login
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
    } finally {
      setLoading(false);
    }
  };

  // Supabase OAuth login
  const loginWithProvider = async (provider: Provider) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
      if (error) return false;

      const { data: sessionData } = await supabase.auth.getSession();
      const access_token = sessionData?.session?.access_token;
      if (!access_token) return false;

      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/supabase-login`,
        {
          access_token,
        }
      );
      if (data.success && data.token && data.user) {
        saveSession(data.token, data.user);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    clearSession();
    await supabase.auth.signOut();
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
