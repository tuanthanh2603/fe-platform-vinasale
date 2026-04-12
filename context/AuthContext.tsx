/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { clearAccessToken, setAccessToken } from "@/lib/auth/token-store";
import { scheduleRefresh, stopScheduler } from "@/lib/auth/token-refresh-scheduler";
import { toastError, toastSuccess, toastWarning } from "@/lib/utils/toast";
import { authService } from "@/lib/services/common/auth/auth.service";

interface AuthUser {
  accountId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (data: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return !payload.exp || payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored) as AuthUser;
      if (isTokenExpired(parsed.accessToken)) {
        localStorage.removeItem("auth");
        clearAccessToken();
      } else {
        setUser(parsed);
        setAccessToken(parsed.accessToken);
        scheduleRefresh(parsed.accessToken);
      }
    }
    setLoading(false);
    return () => stopScheduler();
  }, []);

  const login = (data: AuthUser) => {
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
    setAccessToken(data.accessToken);
    scheduleRefresh(data.accessToken);
  };

  const logout = async () => {
    try {
      const res = await authService.logoutAPI(user?.accountId || "");

      if (res.success) {
        setUser(null);
        localStorage.removeItem("auth");
        clearAccessToken();
        stopScheduler();
        toastSuccess("Đăng xuất thành công!");
      } else {
        toastWarning("Đăng xuất thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      toastError("Đăng xuất thất bại, vui lòng thử lại!");
      // setUser(null);
      // localStorage.removeItem("auth");
      // clearAccessToken();
      // stopScheduler();
    }
  };
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải dùng trong AuthProvider");
  return context;
}