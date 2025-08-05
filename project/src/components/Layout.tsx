import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, User, LogOut, Briefcase } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  if (!user || !profile) {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MiniLinkedIn</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="h-5 w-5 mr-2" />
                <span className="hidden sm:block">Home</span>
              </Link>
              
              <Link
                to={`/profile/${user.id}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive(`/profile/${user.id}`) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden sm:block">Profile</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};