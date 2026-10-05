import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, ArrowLeftRight, Bell } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../ui/Button';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

export function Navbar() {
  const navigate = useNavigate();
  const { role, toggleRole, darkMode, toggleDarkMode, notifications } = useMarketplace();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] transition-colors">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl">
          {/* Logo & Main Links */}
          <div className="flex items-center gap-7">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-7 w-7 rounded-md bg-[#365C63] text-[#FFFDF7] flex items-center justify-center font-bold text-xs tracking-tighter">
                N2D
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7] group-hover:text-[#365C63] transition-colors leading-none">
                  Need2Deal
                </span>
                <span className="text-[10px] text-[#66645E] dark:text-[#A6A39A] tracking-wide mt-0.5">
                  Needs-First Procurement
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              <Link
                to="/buyer/requirements"
                className="text-xs font-medium text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525] dark:hover:text-[#FFFDF7] transition-colors"
              >
                Browse Needs
              </Link>
              <Link
                to="/buyer/providers"
                className="text-xs font-medium text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525] dark:hover:text-[#FFFDF7] transition-colors"
              >
                Verified Suppliers
              </Link>
              <Link
                to="/buyer/categories"
                className="text-xs font-medium text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525] dark:hover:text-[#FFFDF7] transition-colors"
              >
                Categories
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/70 dark:bg-[#232826] text-xs text-[#66645E] dark:text-[#A6A39A] hover:border-[#365C63] transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search marketplace...</span>
              <kbd className="hidden sm:inline text-[9px] font-mono px-1 py-0.2 bg-[#FFFDF7] dark:bg-[#272E2B] rounded border border-[#D2CEC2] dark:border-[#3C4743]">
                ⌘K
              </kbd>
            </button>

            {/* Role Switcher Pill */}
            <button
              onClick={toggleRole}
              title={`Switch active view to ${role === 'buyer' ? 'Provider' : 'Buyer'}`}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] hover:bg-[#E2DDD2] dark:hover:bg-[#2E3733] transition-colors cursor-pointer border border-[#D2CEC2] dark:border-[#3C4743]"
            >
              <ArrowLeftRight className="h-3 w-3 text-[#365C63]" />
              <span>Role: <strong className="capitalize">{role}</strong></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-md text-[#66645E] hover:bg-[#EAE6DA] dark:hover:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-[#B28A52]" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notifications */}
            <button
              onClick={() => navigate(role === 'buyer' ? '/buyer/notifications' : '/provider/notifications')}
              className="relative p-1.5 rounded-md text-[#66645E] hover:bg-[#EAE6DA] dark:hover:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#9A5C55] ring-2 ring-[#FFFDF7] dark:ring-[#272E2B]" />
              )}
            </button>

            {/* Auth CTAs */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#D2CEC2] dark:border-[#3C4743]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Post a Need
              </Button>
            </div>
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
