
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-600 text-white p-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
              <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2H9z"></path>
              <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">BookMyVenue</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {!isLoading && isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              )}
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
