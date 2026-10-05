import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderOffers() {
  const navigate = useNavigate();
  const { offers, requirements } = useMarketplace();
  const [filter, setFilter] = useState<'all' | 'pending' | 'shortlisted' | 'accepted'>('all');

  // Provider p1 offers
  const myOffers = offers.filter((o) => o.providerId === 'p1');

  const filtered = myOffers.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            My Submitted Proposals
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Active quotes, buyer shortlists, and accepted orders pending fulfillment.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/provider/requirements')}
        >
          Find More Demands
        </Button>
      </div>

      <div className="flex gap-2">
        {(['all', 'pending', 'shortlisted', 'accepted'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
              filter === st
                ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
                : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E]'
            }`}
          >
            {st} ({myOffers.filter((o) => st === 'all' || o.status === st).length})
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
        {filtered.map((offer) => {
          const req = requirements.find((r) => r.id === offer.requirementId);

          return (
            <div
              key={offer.id}
              className="p-5 hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#66645E] uppercase">{offer.id}</span>
                  <Badge variant={offer.status === 'accepted' ? 'success' : offer.status === 'shortlisted' ? 'warning' : 'accent'}>
                    {offer.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-[#66645E]">Submitted {offer.submittedAt}</span>
                </div>

                <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {req?.title || 'Demand Item'}
                </h3>

                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] line-clamp-1 max-w-xl">
                  {offer.specs}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
                  <span>Your Quote: <strong className="text-sm font-mono text-[#365C63]">₹{offer.price.toLocaleString()}</strong></span>
                  <span>Committed Turnaround: <strong>{offer.deliveryDays} Days</strong></span>
                  <span>Match Score: <strong>{offer.matchScore}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {offer.status === 'accepted' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/provider/orders')}
                    className="h-8.5 text-xs gap-1"
                  >
                    View Active Order <ArrowRight className="h-3 w-3" />
                  </Button>
                ) : (
                  <Badge variant="outline" className="text-xs">Under Buyer Review</Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
