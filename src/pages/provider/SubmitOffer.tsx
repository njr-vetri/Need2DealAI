import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Eye
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';

export function SubmitOffer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { requirements, submitOffer } = useMarketplace();

  const req = requirements.find((r) => r.id === id) || requirements[0];

  // Offer fields
  const [price, setPrice] = useState<number>(Math.round(req.budget * 0.92));
  const [deliveryDays, setDeliveryDays] = useState<number>(6);
  const [specs, setSpecs] = useState(
    '210 GSM Super-combed Bio-washed Cotton, 2-color precision screen printing using phthalate-free inks. Individual polybag packaging per size.'
  );
  const [warranty, setWarranty] = useState(
    '100% wash-fastness guarantee (minimum 40 machine washes). Free replacement for any misprint defect.'
  );
  const [terms, setTerms] = useState(
    'Sample piece provided within 48 hours for physical signoff before full batch is printed. Balance due upon delivery inspection.'
  );
  const [notes, setNotes] = useState(
    'Direct delivery to campus gates. Experienced team handling student festival requirements.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitOffer({
        requirementId: req.id,
        providerId: 'p1',
        price: Number(price),
        deliveryDays: Number(deliveryDays),
        specs,
        warranty,
        terms,
        notes
      });
      setIsSubmitting(false);
      setSummaryModalOpen(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        navigate('/provider/offers');
      }, 1000);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743] space-y-2">
        <button
          onClick={() => navigate('/provider/requirements')}
          className="text-xs font-semibold text-[#66645E] dark:text-[#A6A39A] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Discover Demands
        </button>
        <div className="flex items-center gap-2">
          <Badge variant="accent">{req.category}</Badge>
          <span className="text-xs text-[#66645E]">Requirement ID: {req.id}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Submit Quotation for &ldquo;{req.title}&rdquo;
        </h1>
        <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
          Buyer: <strong>{req.buyerOrg}</strong> • Target Budget: <strong>₹{req.budget.toLocaleString()}</strong> • Target Date: <strong>{req.deadline}</strong>
        </p>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-bold">Proposal Dispatched Successfully!</p>
            <p className="text-xs opacity-90 mt-0.5">The buyer has been notified and can compare your offer.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Total Quoted Price (₹ all-inclusive)"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            helperText={`Buyer budget cap is ₹${req.budget.toLocaleString()}`}
            required
          />

          <Input
            label="Turnaround Delivery Lead Time (Days)"
            type="number"
            value={deliveryDays}
            onChange={(e) => setDeliveryDays(Number(e.target.value))}
            helperText="Number of working days until physical handover"
            required
          />

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
              Material Specifications & Technical Rider <span className="text-[#9A5C55]">*</span>
            </label>
            <textarea
              rows={3}
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              required
              className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63] leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
              Quality Assurance & Replacement Warranty <span className="text-[#9A5C55]">*</span>
            </label>
            <textarea
              rows={2}
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              required
              className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63] leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
              Commercial Terms & Inspection Protocols
            </label>
            <textarea
              rows={2}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63] leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
              Custom Note / Message to Buyer
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63] leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate('/provider/requirements')}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setSummaryModalOpen(true)}
            className="gap-2 shadow-xs"
          >
            <Eye className="h-4 w-4" /> Review Summary & Submit
          </Button>
        </div>
      </div>

      {/* Final Offer Summary Modal */}
      {summaryModalOpen && (
        <Modal
          isOpen={summaryModalOpen}
          onClose={() => setSummaryModalOpen(false)}
          title="Review Final Proposal Summary"
          description="Verify your commercial terms before dispatching to the buyer."
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#66645E]">Quoted Price:</span>
                <strong className="text-sm font-bold text-[#365C63]">₹{price.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66645E]">Lead Time:</span>
                <strong className="text-sm">{deliveryDays} Working Days</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66645E]">Target Requirement:</span>
                <span className="font-semibold text-right max-w-xs truncate">{req.title}</span>
              </div>
            </div>

            <div>
              <strong className="block text-[#252525] dark:text-[#FFFDF7] mb-1">Specifications:</strong>
              <p className="text-[#66645E] dark:text-[#A6A39A] p-2.5 rounded-lg border border-[#D2CEC2]">
                {specs}
              </p>
            </div>

            <div>
              <strong className="block text-[#252525] dark:text-[#FFFDF7] mb-1">Warranty:</strong>
              <p className="text-[#66645E] dark:text-[#A6A39A] p-2.5 rounded-lg border border-[#D2CEC2]">
                {warranty}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D2CEC2]/60">
              <Button variant="ghost" size="sm" onClick={() => setSummaryModalOpen(false)}>
                Edit Terms
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleSubmit}
                className="gap-1.5"
              >
                <Send className="h-3.5 w-3.5" /> Confirm & Send Bid
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
