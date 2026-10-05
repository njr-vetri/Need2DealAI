import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowRight,
  AlertTriangle,
  Package,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function BuyerDashboard() {
  const navigate = useNavigate();
  const { requirements, offers, orders, providers, agreements } = useMarketplace();

  // Active metrics
  const activeReqs = requirements.filter((r) => r.status === 'active' || r.status === 'in_negotiation');
  const pendingOffers = offers.filter((o) => o.status === 'pending');
  const activeOrders = orders.filter((o) => o.status !== 'completed');
  const pendingAgreements = agreements.filter((a) => a.status === 'awaiting_buyer');

  return (
    <div className="space-y-8">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#365C63] dark:text-[#8BAAB8] font-bold">
              Buyer Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Welcome, Aditya
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Anna University Symposium Lead • Here is what requires your procurement decisions today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/buyer/requirements')}
          >
            All Requirements
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/buyer/requirements/new')}
            className="gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Post Requirement
          </Button>
        </div>
      </div>

      {/* SECTION: Needs Attention (Actionable items requiring user intervention) */}
      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60 mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#A37B52] dark:text-[#C2AB8E]" />
            <h2 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] tracking-tight">
              Needs Your Attention (3 Pending Actions)
            </h2>
          </div>
          <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">Updated real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 1: Pending Offers */}
          <div
            onClick={() => navigate('/buyer/requirements/req-1')}
            className="p-3.5 rounded-lg border border-[#D2CEC2]/80 dark:border-[#3C4743] bg-[#F4F1E8]/60 dark:bg-[#232826] hover:border-[#365C63] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Badge variant="warning">3 Offers In</Badge>
              <ArrowRight className="h-3.5 w-3.5 text-[#66645E] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
              500 Custom Cotton T-Shirts
            </h3>
            <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] mt-1">
              Top match: Chennai PrintWorks at ₹72,000 (96% AI score). Waiting for your review.
            </p>
          </div>

          {/* Action 2: Digital Agreement Pending */}
          <div
            onClick={() => navigate('/buyer/agreements/agr-101')}
            className="p-3.5 rounded-lg border border-[#D2CEC2]/80 dark:border-[#3C4743] bg-[#F4F1E8]/60 dark:bg-[#232826] hover:border-[#365C63] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Badge variant="danger">Agreement Ready</Badge>
              <ArrowRight className="h-3.5 w-3.5 text-[#66645E] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
              Auditorium Sound & Rigging (₹88,000)
            </h3>
            <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] mt-1">
              Starlight Stage & AV has signed. Awaiting your digital signature to confirm contract.
            </p>
          </div>

          {/* Action 3: Active Order Milestone */}
          <div
            onClick={() => navigate('/buyer/orders/ord-801')}
            className="p-3.5 rounded-lg border border-[#D2CEC2]/80 dark:border-[#3C4743] bg-[#F4F1E8]/60 dark:bg-[#232826] hover:border-[#365C63] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Badge variant="success">Fulfillment on Track</Badge>
              <ArrowRight className="h-3.5 w-3.5 text-[#66645E] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
              Order #ord-801: 1,000 Jute Bags
            </h3>
            <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] mt-1">
              Production at 62%. Delivery scheduled for Oct 10 (5 days remaining).
            </p>
          </div>
        </div>
      </div>

      {/* Primary Key Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Active Demands
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">{activeReqs.length}</span>
            <span className="text-[11px] text-[#365C63] font-medium">broadcasted</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Offers for Review
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">{pendingOffers.length}</span>
            <span className="text-[11px] text-[#A37B52] font-medium">pending decision</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Active Orders
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">{activeOrders.length}</span>
            <span className="text-[11px] text-[#365C63] font-medium">in production</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Upcoming Deadline
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">Oct 10</span>
            <span className="text-[11px] text-[#365C63] font-medium">5 days left</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Active Demands & Live Order Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Requirements Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                Active Requirements & Incoming Bids
              </h2>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
                Requirements currently accepting bids or in contract negotiation.
              </p>
            </div>
            <button
              onClick={() => navigate('/buyer/requirements')}
              className="text-xs font-semibold text-[#365C63] dark:text-[#8BAAB8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden">
            <div className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
              {requirements.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  onClick={() => navigate(`/buyer/requirements/${req.id}`)}
                  className="p-4 hover:bg-[#EAE6DA]/50 dark:hover:bg-[#232826] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#66645E] dark:text-[#A6A39A] uppercase">
                        {req.id}
                      </span>
                      <Badge
                        variant={
                          req.status === 'active'
                            ? 'success'
                            : req.status === 'in_negotiation'
                            ? 'accent'
                            : req.status === 'agreement_pending'
                            ? 'warning'
                            : req.status === 'ordered'
                            ? 'match'
                            : 'neutral'
                        }
                      >
                        {req.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">• {req.category}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">
                      {req.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-[#66645E] dark:text-[#A6A39A]">
                      <span>Budget: <strong>₹{req.budget.toLocaleString()}</strong></span>
                      <span>Quantity: <strong>{req.quantity} {req.unit}</strong></span>
                      <span>Target: <strong>{req.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right shrink-0">
                    <div>
                      <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7] block">
                        {req.offersCount} {req.offersCount === 1 ? 'Bid' : 'Bids'}
                      </span>
                      <span className="text-[11px] text-[#365C63]">
                        {req.offersCount > 0 ? 'Ready to compare' : 'Broadcasting'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Inspect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Progress & Recommended Suppliers */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Order Snapshot */}
          <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#365C63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7]">
                  Active Fulfillment
                </h3>
              </div>
              <Badge variant="accent">Order #ord-801</Badge>
            </div>

            {orders[0] && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">
                    {orders[0].title}
                  </h4>
                  <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-0.5">
                    Supplier: {orders[0].providerName} • ₹{orders[0].agreedPrice.toLocaleString()}
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-[#365C63] font-bold">Phase 3: Production Run</span>
                    <span className="text-[#66645E]">Due Oct 10</span>
                  </div>
                  <div className="h-2 w-full bg-[#EAE6DA] dark:bg-[#232826] rounded-full overflow-hidden">
                    <div className="h-full bg-[#365C63] rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#EAE6DA]/40 dark:bg-[#232826] text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                  <strong className="text-[#252525] dark:text-[#FFFDF7] block mb-0.5">Latest Supplier Update:</strong>
                  {orders[0].latestProviderNote}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/buyer/orders/${orders[0].id}`)}
                  className="w-full text-xs"
                >
                  View Full Milestone Timeline <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Recommended Verified Suppliers */}
          <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7]">
                Recommended Suppliers
              </h3>
              <button
                onClick={() => navigate('/buyer/providers')}
                className="text-xs text-[#365C63] hover:underline cursor-pointer"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {providers.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate('/buyer/providers')}
                  className="flex items-start justify-between p-2.5 rounded-lg hover:bg-[#EAE6DA]/50 dark:hover:bg-[#232826] transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7] block">
                      {p.businessName}
                    </span>
                    <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                      {p.categories.join(', ')} • {p.location.split(',')[0]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#365C63] block">{p.reliability}%</span>
                    <span className="text-[10px] text-[#66645E]">Reliability</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
