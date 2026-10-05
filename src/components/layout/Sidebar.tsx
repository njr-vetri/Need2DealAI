import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import {
  LayoutDashboard,
  FileText,
  Send,
  Users,
  Package,
  Layers,
  Archive,
  MessageSquare,
  Bell,
  Settings,
  User,
  ShoppingBag,
  ArrowLeftRight
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export interface SidebarProps {
  role?: 'buyer' | 'provider';
  onCloseMobile?: () => void;
}

export function Sidebar({ role = 'buyer', onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const { toggleRole, notifications } = useMarketplace();

  const unreadCount = notifications.filter(
    (n) => (n.role === role || n.role === 'both') && !n.read
  ).length;

  const buyerLinks = [
    { name: 'Overview', path: '/buyer', icon: LayoutDashboard },
    { name: 'Requirements', path: '/buyer/requirements', icon: FileText },
    { name: 'Offers', path: '/buyer/offers', icon: Send },
    { name: 'Providers', path: '/buyer/providers', icon: Users },
    { name: 'Categories', path: '/buyer/categories', icon: Layers },
    { name: 'Orders', path: '/buyer/orders', icon: Package },
    { name: 'Messages', path: '/buyer/messages', icon: MessageSquare },
    { name: 'Notifications', path: '/buyer/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { name: 'Records', path: '/buyer/records', icon: Archive },
    { name: 'Profile', path: '/buyer/profile', icon: User },
    { name: 'Settings', path: '/buyer/settings', icon: Settings }
  ];

  const providerLinks = [
    { name: 'Overview', path: '/provider', icon: LayoutDashboard },
    { name: 'Discover Needs', path: '/provider/requirements', icon: FileText },
    { name: 'My Offers', path: '/provider/offers', icon: Send },
    { name: 'Orders', path: '/provider/orders', icon: Package },
    { name: 'Catalog', path: '/provider/catalog', icon: ShoppingBag },
    { name: 'Customers', path: '/provider/customers', icon: Users },
    { name: 'Messages', path: '/provider/messages', icon: MessageSquare },
    { name: 'Notifications', path: '/provider/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { name: 'Profile', path: '/provider/profile', icon: User },
    { name: 'Settings', path: '/provider/settings', icon: Settings }
  ];

  const links = role === 'buyer' ? buyerLinks : providerLinks;
  const prefix = role === 'buyer' ? '/buyer' : '/provider';

  const NavItem = ({ link }: { link: (typeof links)[0] }) => {
    const isExact = location.pathname === link.path;
    const isChild = link.path !== prefix && location.pathname.startsWith(link.path);
    const isActive = isExact || isChild;
    const Icon = link.icon;

    return (
      <Link
        to={link.path}
        onClick={onCloseMobile}
        className={cn(
          "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium tracking-tight transition-colors",
          isActive
            ? "bg-[#FFFDF7] dark:bg-[#2E3733] text-[#252525] dark:text-[#FFFDF7] border border-[#D2CEC2] dark:border-[#3C4743] shadow-xs font-semibold"
            : "text-[#66645E] dark:text-[#A6A39A] hover:bg-[#E2DDD2]/70 dark:hover:bg-[#2A332F] hover:text-[#252525] dark:hover:text-[#FFFDF7]"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={cn("h-4 w-4", isActive ? "text-[#365C63] dark:text-[#8BAAB8]" : "text-[#66645E] dark:text-[#A6A39A]")} />
          <span>{link.name}</span>
        </div>
        {link.badge !== undefined && (
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#9A5C55] text-white">
            {link.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA] dark:bg-[#232826] transition-colors">
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between px-5 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-[#365C63] text-[#FFFDF7] flex items-center justify-center font-bold text-xs">
            N2D
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7] block leading-none">
              Need2Deal
            </span>
            <span className="text-[10px] text-[#6F8065] dark:text-[#9DB094] font-medium tracking-wide">
              {role === 'buyer' ? 'Buyer Workspace' : 'Supplier Hub'}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A]">
          Navigation
        </div>
        {links.map((link) => (
          <NavItem key={link.name} link={link} />
        ))}
      </div>

      {/* Role Switcher & Bottom Status */}
      <div className="p-3.5 border-t border-[#D2CEC2] dark:border-[#3C4743] bg-[#E2DDD2]/60 dark:bg-[#1E2321]/60 space-y-2.5">
        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] text-xs font-medium text-[#252525] dark:text-[#FFFDF7] hover:bg-[#EAE6DA] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-3.5 w-3.5 text-[#365C63]" />
            <span>Switch Role</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#365C63]/10 text-[#365C63] dark:text-[#8BAAB8] font-semibold">
            {role === 'buyer' ? '→ Provider' : '→ Buyer'}
          </span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2.5 px-1.5">
          <div className="h-7 w-7 rounded-md bg-[#A37B52] text-[#FFFDF7] flex items-center justify-center text-xs font-bold">
            {role === 'buyer' ? 'AS' : 'CP'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7] truncate">
              {role === 'buyer' ? 'Aditya Swaminathan' : 'Chennai PrintWorks'}
            </span>
            <span className="text-[10px] text-[#66645E] dark:text-[#A6A39A] truncate">
              {role === 'buyer' ? 'Tech Symposium Lead' : 'Verified Supplier'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
