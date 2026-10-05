import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Package,
  Send,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderDashboard() {
  const navigate = useNavigate();
  const { requirements, offers, orders, notifications } = useMarketplace();

  const openReqs = requirements.filter((r) => r.status === 'active' || r.status === 'in_negotiation');
  const myOffers = offers.filter((o) => o.providerId === 'p1');
  const activeOrders = orders.filter((o) => o.providerId === 'p1' || o.providerName.includes('Chennai'));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#365C63] dark:text-[#8BAAB8] font-bold">
              Supplier Command Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Chennai PrintWorks
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Verified Apparel & Print Manufacturer • 96% Reliability Rating • 184 Orders Handed Over
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/provider/offers')}
          >
            My Submitted Bids
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/provider/requirements')}
            className="gap-2 shadow-sm"
          >
            Discover Open Demands <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Matching Demands
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#365C63] dark:text-[#8BAAB8]">{openReqs.length}</span>
            <span className="text-[11px] text-[#66645E]">in your category</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Proposals Pending
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">{myOffers.length}</span>
            <span className="text-[11px] text-[#A37B52]">awaiting decision</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Active Fulfillment
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#252525] dark:text-[#FFFDF7]">{activeOrders.length}</span>
            <span className="text-[11px] text-[#365C63]">on schedule</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
          <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block uppercase tracking-wide">
            Reliability Score
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#365C63] dark:text-[#8BAAB8]">96%</span>
            <span className="text-[11px] text-[#365C63]">Tier 1 Preferred</span>
          </div>
        </div>
      </div>

      {/* Main Split: Matched For You & Orders Requiring Status Advances */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Matched for You Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#365C63]" /> Matched For Your Workshop
              </h2>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
                Ranked using your historical turnaround speed, machinery fit, and typical price sweet spot.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider/requirements')}
              className="text-xs font-semibold text-[#365C63] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Browse all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {openReqs.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs hover:border-[#365C63] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#66645E] uppercase">{req.id}</span>
                      <Badge variant="accent">{req.category}</Badge>
                      <span className="text-xs text-[#66645E]">Posted by {req.buyerOrg}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                      {req.title}
                    </h3>
                  </div>

                  <Badge variant="match">96% Machine Fit</Badge>
                </div>

                <div className="p-3 rounded-lg bg-[#E7EFE5]/50 dark:bg-[#29382B] text-xs font-medium text-[#3D5A38] dark:text-[#8BAAB8] flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>
                    96% match because this requirement fits your Apparel category, delivery turnaround capability (6 days buffer), and ₹70k-₹90k typical budget range.
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#D2CEC2]/40 text-xs">
                  <div className="flex items-center gap-6 text-[#66645E] dark:text-[#A6A39A]">
                    <span>Buyer Budget: <strong className="text-[#252525] dark:text-[#FFFDF7] font-mono">₹{req.budget.toLocaleString()}</strong></span>
                    <span>Quantity: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.quantity} {req.unit}</strong></span>
                    <span>Deadline: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.deadline}</strong></span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/provider/requirements/${req.id}/offer`)}
                    className="h-8.5 text-xs shadow-xs"
                  >
                    Submit Quotation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Production Milestones to Update */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#365C63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7]">
                  Fulfillment Status Action
                </h3>
              </div>
              <Badge variant="warning">Update Required</Badge>
            </div>

            {activeOrders[0] && (
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">
                    {activeOrders[0].title}
                  </h4>
                  <p className="text-[#66645E] mt-0.5">
                    Buyer: {activeOrders[0].buyerOrg} • ₹{activeOrders[0].agreedPrice.toLocaleString()}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#EAE6DA]/50 dark:bg-[#232826] space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Current Stage:</span>
                    <span className="text-[#365C63]">
                      {activeOrders[0].timeline[activeOrders[0].currentStepIndex]?.step}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#66645E]">
                    <span>Contract Deadline:</span>
                    <span>{activeOrders[0].deliveryDate}</span>
                  </div>
                </div>

                <p className="text-[#66645E] leading-relaxed">
                  Keeping your buyer updated ensures your reliability score remains at 96%+.
                </p>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/provider/orders')}
                  className="w-full text-xs shadow-xs"
                >
                  Manage Order & Log Progress
                </Button>
              </div>
            )}
          </div>

          {/* Quick Stats: Reliability Benchmarking */}
          <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#252525] dark:text-[#FFFDF7]">
              Supplier Health & Metrics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between pb-1.5 border-b border-[#D2CEC2]/40">
                <span className="text-[#66645E]">On-Time Delivery Rate:</span>
                <strong className="text-[#365C63]">98.2%</strong>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#D2CEC2]/40">
                <span className="text-[#66645E]">Average Bid Win Rate:</span>
                <strong className="text-[#252525] dark:text-[#FFFDF7]">41%</strong>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#D2CEC2]/40">
                <span className="text-[#66645E]">Repeat Institutional Clients:</span>
                <strong className="text-[#252525] dark:text-[#FFFDF7]">14 Colleges</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
