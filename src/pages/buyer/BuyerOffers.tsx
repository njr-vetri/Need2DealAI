import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, CheckCircle2, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function BuyerOffers() {
  const navigate = useNavigate();
  const { offers, requirements, providers, selectOfferAndCreateAgreement } = useMarketplace();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shortlisted' | 'accepted'>('all');

  const filteredOffers = offers.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Supplier Proposals & Quotes
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Review, shortlist, and convert verified supplier proposals into mutual agreements.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'pending', 'shortlisted', 'accepted'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
                : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E] dark:text-[#A6A39A]'
            }`}
          >
            {st} ({offers.filter((o) => st === 'all' || o.status === st).length})
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
        {filteredOffers.map((offer) => {
          const provider = providers.find((p) => p.id === offer.providerId);
          const req = requirements.find((r) => r.id === offer.requirementId);

          return (
            <div
              key={offer.id}
              className="p-5 hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#66645E] uppercase">
                    {offer.id}
                  </span>
                  <Badge variant={offer.status === 'accepted' ? 'success' : offer.status === 'shortlisted' ? 'warning' : 'accent'}>
                    {offer.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-[#A37B52] font-semibold">
                    Target: {req?.title || 'Demand'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <strong className="text-base text-[#252525] dark:text-[#FFFDF7]">
                    {provider?.businessName}
                  </strong>
                  <span className="text-xs text-[#66645E]">({provider?.rating}★, {provider?.reliability}% reliability)</span>
                </div>

                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] line-clamp-1 max-w-xl">
                  {offer.specs}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
                  <span>Quote: <strong className="text-sm text-[#365C63] font-mono">₹{offer.price.toLocaleString()}</strong></span>
                  <span>Turnaround: <strong>{offer.deliveryDays} Days</strong></span>
                  <span>Match: <strong>{offer.matchScore}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/buyer/requirements/${offer.requirementId}`)}
                  className="h-8.5 text-xs gap-1"
                >
                  View in Comparison <ChevronRight className="h-3 w-3" />
                </Button>
                {offer.status !== 'accepted' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const agr = selectOfferAndCreateAgreement(offer.id);
                      if (agr) navigate(`/buyer/agreements/${agr.id}`);
                    }}
                    className="h-8.5 text-xs"
                  >
                    Accept & Sign
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
