
import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("bookmyvenue-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy users for mock authentication
      const dummyUsers = [
        { id: "1", name: "John Doe", email: "user@example.com", password: "password", role: "user" },
        { id: "2", name: "Admin User", email: "admin@example.com", password: "password", role: "admin" }
      ];
      
      const foundUser = dummyUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword as User);
      localStorage.setItem("bookmyvenue-user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role: "user" as const
      };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem("bookmyvenue-user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bookmyvenue-user");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
