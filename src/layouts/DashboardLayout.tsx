import * as React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useUIStore } from '../hooks/useStore';
import { Logo } from '../components/ui/Logo';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUIStore();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const getActiveTab = () => {
    if (location.pathname.includes('intelligence')) return 'intelligence';
    if (location.pathname.includes('compliance')) return 'compliance';
    return 'portfolio';
  };

  const activeTab = getActiveTab();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-gray-200">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo to="/dashboard/portfolio" />
            <div className="flex space-x-1 sm:space-x-4 overflow-x-auto">
              <Link 
                to="/dashboard/portfolio"
                className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'portfolio' ? 'bg-surface text-primary' : 'text-gray-300 hover:text-white hover:bg-surface-hover'}`}
              >
                Portfolio
              </Link>
              <Link 
                to="/dashboard/intelligence"
                className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'intelligence' ? 'bg-surface text-primary' : 'text-gray-300 hover:text-white hover:bg-surface-hover'}`}
              >
                Intelligence
              </Link>
              <Link 
                to="/dashboard/compliance"
                className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'compliance' ? 'bg-surface text-primary' : 'text-gray-300 hover:text-white hover:bg-surface-hover'}`}
              >
                Compliance
              </Link>
            </div>
            <div className="flex items-center space-x-4 relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-surface-hover p-1.5 rounded-md transition-colors"
              >
                <UserCircle className="w-6 h-6 text-slate-muted" />
                <span className="text-sm font-medium hidden sm:block">{user?.name || 'H.N.W. Client'}</span>
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-surface border border-border py-1 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border/50">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-muted truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-surface-hover flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Secure Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
