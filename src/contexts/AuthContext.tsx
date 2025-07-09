import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types/auth";
import type { UserRole } from "../types/auth";
import type { RegisterData } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for saved user data
        const savedUser = localStorage.getItem("schoolhub_user");
        const token = localStorage.getItem("schoolhub_token");

        if (savedUser && token) {
          // In a real app, you would validate the token with your backend
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid data
        localStorage.removeItem("schoolhub_user");
        localStorage.removeItem("schoolhub_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    _password: string,
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - replace with actual API response
      const mockUser: User = {
        id: "user_123",
        email,
        firstName: "John",
        lastName: "Doe",
        role,
        schoolCode: "SCH001",
        schoolName: "Sample School",
        ...(role === "student" && {
          studentId: "STU001",
          classGrade: "grade-10",
        }),
        ...(role === "teacher" && {
          employeeId: "EMP001",
          department: "Mathematics",
        }),
        ...(role === "parent" && { parentStudentId: "STU002" }),
      };

      // Mock token
      const mockToken = "mock_jwt_token_" + Date.now();

      // Save to localStorage (in production, consider more secure storage)
      localStorage.setItem("schoolhub_user", JSON.stringify(mockUser));
      localStorage.setItem("schoolhub_token", mockToken);

      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful registration
      const newUser: User = {
        id: "user_" + Date.now(),
        ...userData,
      };

      // Mock token
      const mockToken = "mock_jwt_token_" + Date.now();

      // Save to localStorage
      localStorage.setItem("schoolhub_user", JSON.stringify(newUser));
      localStorage.setItem("schoolhub_token", mockToken);

      setUser(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data
    setUser(null);
    localStorage.removeItem("schoolhub_user");
    localStorage.removeItem("schoolhub_token");

    // Redirect to home page
    window.location.href = "/";
  };

  const resetPassword = async (email: string): Promise<void> => {
    // Simulate API call for password reset
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would send a reset email
    console.log("Password reset email sent to:", email);
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error("No user logged in");

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("schoolhub_user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Profile update failed:", error);
      throw new Error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper functions for role-based access control
export const hasRole = (user: User | null, roles: UserRole[]): boolean => {
  return user ? roles.includes(user.role) : false;
};

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ["admin"]);
};

export const isTeacher = (user: User | null): boolean => {
  return hasRole(user, ["teacher"]);
};

export const isParent = (user: User | null): boolean => {
  return hasRole(user, ["parent"]);
};

export const isStudent = (user: User | null): boolean => {
  return hasRole(user, ["student"]);
};

export const isStaff = (user: User | null): boolean => {
  return hasRole(user, ["admin", "teacher", "secretary", "proprietor"]);
};

export const canManageStudents = (user: User | null): boolean => {
  return hasRole(user, ["admin", "teacher", "secretary"]);
};

export const canViewFinancials = (user: User | null): boolean => {
  return hasRole(user, ["admin", "proprietor", "secretary"]);
};

// Get role-specific dashboard route
export const getRoleDashboardRoute = (role: UserRole): string => {
  const roleRoutes = {
    admin: "/dashboard/admin",
    teacher: "/dashboard/teacher",
    secretary: "/dashboard/secretary",
    proprietor: "/dashboard/proprietor",
    parent: "/dashboard/parent",
    student: "/dashboard/student",
  };
  return roleRoutes[role] || "/dashboard";
};

// Re-export types for backward compatibility
export type { User, UserRole, RegisterData } from "../types/auth";

export default AuthContext;
 