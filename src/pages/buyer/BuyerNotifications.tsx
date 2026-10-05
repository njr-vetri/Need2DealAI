import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Send,
  ArrowRight,
  CheckCheck
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function BuyerNotifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, role } = useMarketplace();
  const [filter, setFilter] = useState<'all' | 'unread' | 'reminders'>('all');

  const buyerNotifications = notifications.filter(
    (n) => n.role === 'buyer' || n.role === 'both'
  );

  const filtered = buyerNotifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'reminders') return n.type === 'reminder';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'offer':
        return <Send className="h-4 w-4 text-[#365C63]" />;
      case 'agreement':
        return <FileCheck className="h-4 w-4 text-[#A37B52]" />;
      case 'order':
        return <CheckCircle2 className="h-4 w-4 text-[#252525] dark:text-[#8BAAB8]" />;
      case 'reminder':
        return <AlertTriangle className="h-4 w-4 text-[#9A5C55]" />;
      default:
        return <Bell className="h-4 w-4 text-[#365C63]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Notifications & SLA Reminders
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Real-time updates on supplier bids, countersignatures, and impending delivery milestones.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllNotificationsAsRead}
          className="gap-1.5 text-xs"
        >
          <CheckCheck className="h-3.5 w-3.5" /> Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            filter === 'all'
              ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
              : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E]'
          }`}
        >
          All ({buyerNotifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
              : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E]'
          }`}
        >
          Unread ({buyerNotifications.filter((n) => !n.read).length})
        </button>
        <button
          onClick={() => setFilter('reminders')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            filter === 'reminders'
              ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
              : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E]'
          }`}
        >
          Deadlines & Reminders
        </button>
      </div>

      {/* Notifications List */}
      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              markNotificationAsRead(item.id);
              navigate(item.link);
            }}
            className={`p-4 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
              !item.read
                ? 'bg-[#E7EFE5]/40 dark:bg-[#29382B]/30'
                : 'hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[#EAE6DA] dark:bg-[#232826] mt-0.5 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
                    {item.title}
                  </h4>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-[#9A5C55]" />
                  )}
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {item.type}
                  </Badge>
                </div>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                  {item.message}
                </p>
                <span className="text-[10px] text-[#66645E] font-mono block">
                  {item.timestamp}
                </span>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-[#66645E] shrink-0 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
