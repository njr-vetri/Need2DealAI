import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, ChevronRight, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function BuyerOrders() {
  const navigate = useNavigate();
  const { orders } = useMarketplace();
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.providerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Orders & Milestone Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Monitor live production stages, dispatch verifications, and delivery sign-offs.
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search by order ID, item name, or supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      {filteredOrders.length > 0 ? (
        <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => navigate(`/buyer/orders/${ord.id}`)}
              className="p-5 hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#66645E] uppercase">
                    {ord.id}
                  </span>
                  <Badge variant={ord.status === 'completed' ? 'success' : 'accent'}>
                    {ord.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-xs text-[#66645E]">
                    • Due {ord.deliveryDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {ord.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#66645E] dark:text-[#A6A39A]">
                  <span>Supplier: <strong className="text-[#252525] dark:text-[#FFFDF7]">{ord.providerName}</strong></span>
                  <span>Agreed Price: <strong className="text-[#365C63]">₹{ord.agreedPrice.toLocaleString()}</strong></span>
                  <span>Volume: {ord.quantity} {ord.unit}</span>
                  <span>Current Step: <strong>{ord.timeline[ord.currentStepIndex]?.step}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <Button variant="outline" size="sm" className="h-8.5 text-xs gap-1">
                  Track Timeline <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-[#D2CEC2] rounded-xl text-xs text-[#66645E]">
          No orders match your search.
        </div>
      )}
    </div>
  );
}
