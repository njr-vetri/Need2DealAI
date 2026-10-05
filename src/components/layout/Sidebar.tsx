
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils/cn"
import { LayoutDashboard, FileText, Send, Users, Package, MessageSquare, Bell, Settings, User } from "lucide-react"

export function Sidebar({ role = 'buyer' }: { role?: 'buyer' | 'provider' }) {
  const location = useLocation();
  
  const buyerLinks = [
    { name: 'Overview', path: '/buyer', icon: LayoutDashboard },
    { name: 'Requirements', path: '/buyer/requirements', icon: FileText },
    { name: 'Offers', path: '/buyer/offers', icon: Send },
    { name: 'Orders', path: '/buyer/orders', icon: Package },
    { name: 'Providers', path: '/buyer/providers', icon: Users },
  ];

  const providerLinks = [
    { name: 'Overview', path: '/provider', icon: LayoutDashboard },
    { name: 'Discover Needs', path: '/provider/requirements', icon: FileText },
    { name: 'My Offers', path: '/provider/offers', icon: Send },
    { name: 'Orders', path: '/provider/orders', icon: Package },
    { name: 'Catalog', path: '/provider/products', icon: Package },
  ];

  const links = role === 'buyer' ? buyerLinks : providerLinks;
  const prefix = role === 'buyer' ? '/buyer' : '/provider';

  const bottomLinks = [
    { name: 'Messages', path: `${prefix}/messages`, icon: MessageSquare },
    { name: 'Notifications', path: `${prefix}/notifications`, icon: Bell },
    { name: 'Profile', path: `${prefix}/profile`, icon: User },
    { name: 'Settings', path: `${prefix}/settings`, icon: Settings },
  ]

  const NavItem = ({ link }: { link: any }) => {
    const isActive = location.pathname === link.path || (link.path !== prefix && location.pathname.startsWith(link.path));
    const Icon = link.icon;
    return (
      <Link
        to={link.path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Icon className="h-4 w-4" />
        {link.name}
      </Link>
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-surface">
      <div className="flex h-16 items-center px-6 border-b border-gray-100">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          ReverseMarket
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="flex flex-col gap-1">
          {links.map(link => <NavItem key={link.name} link={link} />)}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-100">
        <nav className="flex flex-col gap-1">
          {bottomLinks.map(link => <NavItem key={link.name} link={link} />)}
        </nav>
      </div>
    </aside>
  )
}
