import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sparkles, Send, FileCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderNotifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useMarketplace();

  const providerNotifications = notifications.filter(
    (n) => n.role === 'provider' || n.role === 'both'
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Supplier Opportunity Alerts & Notices
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Real-time pings for matching requirements, shortlisted offers, and milestone reminders.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead}>
          Mark All Read
        </Button>
      </div>

      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
        {providerNotifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationAsRead(n.id);
              navigate(n.link);
            }}
            className={`p-4 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
              !n.read ? 'bg-[#E7EFE5]/40 dark:bg-[#29382B]/30' : 'hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[#EAE6DA] dark:bg-[#232826] mt-0.5">
                <Sparkles className="h-4 w-4 text-[#365C63]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
                    {n.title}
                  </h4>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-[#9A5C55]" />}
                  <Badge variant="outline" className="text-[10px]">{n.type}</Badge>
                </div>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">{n.message}</p>
                <span className="text-[10px] text-[#66645E] font-mono block">{n.timestamp}</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#66645E] shrink-0 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
