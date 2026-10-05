import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Order } from '../../data/mockData';

export function ProviderOrders() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useMarketplace();

  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState<Order | null>(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [customNote, setCustomNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const myOrders = orders; // All active orders in mock

  const handleOpenStatusModal = (ord: Order) => {
    setSelectedOrderForStatus(ord);
    setSelectedStageIndex(Math.min(ord.timeline.length - 1, ord.currentStepIndex + 1));
    setCustomNote(`Advancing ${ord.title} to next milestone stage.`);
  };

  const handleConfirmStageUpdate = () => {
    if (!selectedOrderForStatus) return;
    setIsUpdating(true);

    setTimeout(() => {
      updateOrderStatus(selectedOrderForStatus.id, selectedStageIndex, customNote);
      setIsUpdating(false);
      setSelectedOrderForStatus(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Supplier Fulfillment Operations
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Log workshop progress, commit milestone advances, and keep collegiate buyers synchronized.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {myOrders.map((ord) => (
          <div
            key={ord.id}
            className="p-6 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#66645E] uppercase">{ord.id}</span>
                  <Badge variant={ord.status === 'completed' ? 'success' : 'accent'}>
                    {ord.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-xs text-[#A37B52] font-semibold">
                    Client: {ord.buyerOrg}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {ord.title}
                </h3>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-mono text-[#66645E] block">Contract Value</span>
                <span className="text-xl font-bold font-mono text-[#365C63] dark:text-[#8BAAB8]">
                  ₹{ord.agreedPrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#9A5C55] font-semibold block mt-0.5 flex items-center justify-end gap-1">
                  <Clock className="h-3.5 w-3.5" /> Due {ord.deliveryDate}
                </span>
              </div>
            </div>

            {/* Stage Stepper Progress Bar */}
            <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#252525] dark:text-[#FFFDF7]">
                  Current Status: <strong className="text-[#365C63]">{ord.timeline[ord.currentStepIndex]?.step}</strong>
                </span>
                <span className="text-[11px] text-[#66645E] font-mono">
                  Step {ord.currentStepIndex + 1} of {ord.timeline.length}
                </span>
              </div>

              {/* Step dots */}
              <div className="grid grid-cols-7 gap-1">
                {ord.timeline.map((st, i) => (
                  <div
                    key={st.step}
                    title={st.step}
                    className={`h-2 rounded-full transition-all ${
                      i <= ord.currentStepIndex
                        ? 'bg-[#365C63]'
                        : 'bg-[#D2CEC2] dark:bg-[#3C4743]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#66645E] pt-1">
                <span>Start: Confirmed</span>
                <span className="italic truncate max-w-md">&ldquo;{ord.latestProviderNote}&rdquo;</span>
                <span>Final: Handover</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-[#66645E]">
                Carrier: <strong className="text-[#252525] dark:text-[#FFFDF7]">{ord.carrier}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/buyer/orders/${ord.id}`)}
                  className="h-8.5 text-xs"
                >
                  View Public Tracking Link
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenStatusModal(ord)}
                  className="h-8.5 text-xs shadow-xs"
                >
                  Advance Milestone Stage
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Advance Confirmation Dialog */}
      {selectedOrderForStatus && (
        <Modal
          isOpen={!!selectedOrderForStatus}
          onClose={() => setSelectedOrderForStatus(null)}
          title={`Update Status: ${selectedOrderForStatus.title}`}
          description="Advance the production lifecycle milestone and post an authentic status note."
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs text-[#252525] dark:text-[#FFFDF7]">
                Target Milestone Phase:
              </label>
              <select
                value={selectedStageIndex}
                onChange={(e) => setSelectedStageIndex(Number(e.target.value))}
                className="h-10 w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 text-xs text-[#252525] dark:text-[#FFFDF7] focus:outline-none focus:ring-1 focus:ring-[#365C63]"
              >
                {selectedOrderForStatus.timeline.map((s, idx) => (
                  <option key={s.step} value={idx}>
                    Phase {idx + 1}: {s.step} {idx <= selectedOrderForStatus.currentStepIndex ? '(Completed / Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs text-[#252525] dark:text-[#FFFDF7]">
                Workshop Progress Note (Visible to Buyer)
              </label>
              <textarea
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Printing completed, passing through quality drying chamber before bundling."
                className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63]"
              />
            </div>

            <div className="p-3 rounded-lg bg-[#E7EFE5]/60 text-[#3D5A38] text-[11px] leading-relaxed">
              Advancing milestones automatically alerts the buyer and logs an immutable timestamp on the order ledger.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#D2CEC2]/60">
              <Button variant="ghost" size="sm" onClick={() => setSelectedOrderForStatus(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isUpdating}
                onClick={handleConfirmStageUpdate}
              >
                Confirm Milestone Advance
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
