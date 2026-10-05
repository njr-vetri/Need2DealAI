import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, Search, Bell, Sun, Moon, ArrowLeftRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { AIAssistantDrawer } from '../ai/AIAssistantDrawer';

export function DashboardLayout({ role }: { role: 'buyer' | 'provider' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleRole, darkMode, toggleDarkMode, notifications } = useMarketplace();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(
    (n) => (n.role === role || n.role === 'both') && !n.read
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F4F1E8] dark:bg-[#1C201F] text-[#252525] dark:text-[#EDE9E1] transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar role={role} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#252525]/40 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 h-full">
            <Sidebar role={role} onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] px-4 sm:px-8 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-[#66645E] hover:bg-[#EAE6DA] dark:hover:bg-[#232826] cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Quick Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/70 dark:bg-[#232826] text-xs text-[#66645E] dark:text-[#A6A39A] hover:border-[#365C63] transition-colors cursor-pointer w-48 sm:w-64"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search demand, suppliers...</span>
              <kbd className="ml-auto hidden sm:inline text-[9px] font-mono px-1 py-0.2 bg-[#FFFDF7] dark:bg-[#272E2B] rounded border border-[#D2CEC2] dark:border-[#3C4743]">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Role switch button */}
            <button
              onClick={toggleRole}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] border border-[#D2CEC2] dark:border-[#3C4743] hover:bg-[#E2DDD2] transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="h-3 w-3 text-[#365C63]" />
              <span>Viewing as: <strong className="capitalize">{role}</strong></span>
            </button>

            {/* Dark mode toggle */}
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
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-7 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & AI Assistant */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AIAssistantDrawer />
    </div>
  );
}
