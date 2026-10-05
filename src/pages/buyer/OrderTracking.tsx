import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  ShieldCheck,
  FileText,
  Calendar,
  Building,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, role, updateOrderStatus } = useMarketplace();

  const order = orders.find((o) => o.id === id) || orders[0];

  const [advancingStep, setAdvancingStep] = useState(false);

  const handleSimulateNextStep = () => {
    if (order.currentStepIndex < order.timeline.length - 1) {
      setAdvancingStep(true);
      setTimeout(() => {
        updateOrderStatus(
          order.id,
          order.currentStepIndex + 1,
          `Advanced to ${order.timeline[order.currentStepIndex + 1]?.step}`
        );
        setAdvancingStep(false);
      }, 500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="space-y-1">
          <button
            onClick={() => navigate(role === 'buyer' ? '/buyer/orders' : '/provider/orders')}
            className="text-xs font-semibold text-[#66645E] dark:text-[#A6A39A] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Orders
          </button>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#66645E] dark:text-[#A6A39A] uppercase">
              {order.id}
            </span>
            <Badge
              variant={
                order.status === 'completed' || order.status === 'delivered'
                  ? 'success'
                  : 'accent'
              }
            >
              {order.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            {order.title}
          </h1>
          <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
            Supplier: <strong className="text-[#252525] dark:text-[#FFFDF7]">{order.providerName}</strong> • Buyer: {order.buyerOrg}
          </p>
        </div>

        {/* Action Button: Advance Milestone (especially useful for Provider testing or live demo) */}
        <div className="flex items-center gap-2">
          {order.currentStepIndex < order.timeline.length - 1 && (
            <Button
              variant="outline"
              size="sm"
              isLoading={advancingStep}
              onClick={handleSimulateNextStep}
              className="text-xs"
            >
              Simulate Next Milestone →
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/buyer/agreements/${order.agreementId}`)}
            className="text-xs shadow-xs"
          >
            View Signed Agreement
          </Button>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] text-xs">
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Agreed Price</span>
          <strong className="text-base text-[#365C63] dark:text-[#8BAAB8]">₹{order.agreedPrice.toLocaleString()}</strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Target Delivery</span>
          <strong className="text-sm text-[#252525] dark:text-[#FFFDF7]">{order.deliveryDate}</strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Carrier Tracking</span>
          <strong className="text-xs font-mono text-[#252525] dark:text-[#FFFDF7] truncate block">
            {order.trackingNumber || 'Assigned upon dispatch'}
          </strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">SLA Delivery Risk</span>
          <strong className={order.delayRisk ? 'text-[#9A5C55] font-bold' : 'text-[#365C63] font-bold'}>
            {order.delayRisk ? 'Flagged: 24h Buffer Tight' : 'On Track (Zero Delay Flags)'}
          </strong>
        </div>
      </div>

      {/* Main Split Layout: Milestone Timeline & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Strong Visual Milestone Timeline */}
        <div className="md:col-span-8 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
            <div>
              <h2 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                Production & Delivery Milestone Tracker
              </h2>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-0.5">
                Real-time updates authenticated directly by the supplier.
              </p>
            </div>
            <span className="text-xs font-mono text-[#365C63]">
              Step {order.currentStepIndex + 1} of {order.timeline.length}
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#D2CEC2] dark:before:bg-[#3C4743]">
            {order.timeline.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';
              const isPending = step.status === 'pending';

              return (
                <div key={step.step} className="relative flex items-start gap-4">
                  {/* Milestone Marker */}
                  <div
                    className={`absolute -left-6 top-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-[#365C63] text-[#FFFDF7] ring-4 ring-[#FFFDF7] dark:ring-[#252525]'
                        : isCurrent
                        ? 'bg-[#252525] dark:bg-[#FFFDF7] text-[#FFFDF7] dark:text-[#252525] ring-4 ring-[#365C63]/30 animate-pulse'
                        : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E] border border-[#D2CEC2] dark:border-[#3C4743]'
                    }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          isCompleted
                            ? 'text-[#252525] dark:text-[#FFFDF7]'
                            : isCurrent
                            ? 'text-[#365C63] dark:text-[#8BAAB8]'
                            : 'text-[#66645E]/70 dark:text-[#A6A39A]/60'
                        }`}
                      >
                        {step.step}
                      </h4>
                      <span className="text-xs font-mono text-[#66645E] dark:text-[#A6A39A]">
                        {step.date || 'Pending'}
                      </span>
                    </div>

                    {step.note && (
                      <p
                        className={`text-xs leading-relaxed p-2.5 rounded-lg border ${
                          isCurrent
                            ? 'bg-[#E7EFE5]/60 dark:bg-[#29382B] border-[#C8DAC4] text-[#3D5A38] dark:text-[#8BAAB8] font-medium'
                            : 'bg-[#EAE6DA]/40 dark:bg-[#232826] border-[#D2CEC2]/60 text-[#66645E] dark:text-[#A6A39A]'
                        }`}
                      >
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Supplier Live Note & Agreement Summary */}
        <div className="md:col-span-4 space-y-6">
          {/* Supplier Live Memo */}
          <div className="p-5 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7]">
              Latest Supplier Dispatch Memo
            </h3>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed italic border-l-2 border-[#365C63] pl-3 py-1">
              &ldquo;{order.latestProviderNote || 'Production proceeding according to signed schedule.'}&rdquo;
            </p>
            <div className="text-[11px] text-[#66645E] pt-1">
              Last authenticated: {order.lastUpdate}
            </div>
          </div>

          {/* Delivery & Logistics info */}
          <div className="p-5 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs space-y-3 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#252525] dark:text-[#FFFDF7]">
              Logistics & Handover Rider
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-[#365C63] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#66645E] block text-[10px]">Carrier Assigned</span>
                  <strong className="text-[#252525] dark:text-[#FFFDF7]">{order.carrier}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-[#365C63] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#66645E] block text-[10px]">Contract Delivery Cutoff</span>
                  <strong className="text-[#252525] dark:text-[#FFFDF7]">{order.deliveryDate}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* SLA Reminder Card */}
          <div className="p-4 rounded-xl bg-[#F5EEDF] dark:bg-[#3D3525] border border-[#E5D7BF] dark:border-[#534732] flex items-start gap-3 text-xs">
            <AlertTriangle className="h-4 w-4 text-[#78572A] dark:text-[#E5CFA3] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#78572A] dark:text-[#E5CFA3] block mb-0.5">
                Automatic SLA Reminder Active
              </strong>
              <p className="text-[#78572A]/90 dark:text-[#E5CFA3]/90 leading-relaxed text-[11px]">
                Supplier will receive an automated ping 48 hours prior to delivery to confirm direct van dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
