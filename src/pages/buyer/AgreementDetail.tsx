import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function AgreementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agreements, signAgreement, role } = useMarketplace();

  const agreement = agreements.find((a) => a.id === id) || agreements[0];
  const [isSigning, setIsSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  const isBuyerSigned = !!agreement.buyerSignedAt;
  const isProviderSigned = !!agreement.providerSignedAt;
  const isFullyAgreed = agreement.status === 'agreed' || (isBuyerSigned && isProviderSigned);

  const canCurrentRoleSign =
    (role === 'buyer' && !isBuyerSigned) || (role === 'provider' && !isProviderSigned);

  const handleSign = () => {
    setIsSigning(true);
    setTimeout(() => {
      signAgreement(agreement.id, role);
      setIsSigning(false);
      setSignedSuccess(true);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <button
            onClick={() => navigate(role === 'buyer' ? '/buyer/requirements' : '/provider/orders')}
            className="text-xs font-semibold text-[#66645E] dark:text-[#A6A39A] hover:underline mb-1 cursor-pointer"
          >
            ← Back to Overview
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Mutual Trade Agreement
            </h1>
            <Badge
              variant={
                isFullyAgreed
                  ? 'success'
                  : agreement.status === 'awaiting_buyer'
                  ? 'warning'
                  : 'accent'
              }
            >
              {isFullyAgreed
                ? 'Agreed & Legally Binding'
                : agreement.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs"
          >
            <Printer className="h-3.5 w-3.5" /> Print / Save PDF
          </Button>

          {isFullyAgreed && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(role === 'buyer' ? '/buyer/orders' : '/provider/orders')}
              className="gap-1.5 text-xs shadow-xs"
            >
              Track Live Order <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Completion alert banner */}
      {isFullyAgreed && (
        <div className="p-4 rounded-xl bg-[#E7EFE5] dark:bg-[#29382B] border border-[#C8DAC4] dark:border-[#374C3A] flex items-center justify-between gap-4 text-xs font-semibold text-[#3D5A38] dark:text-[#8BAAB8] animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-bold">Mutual Digital Agreement Executed</p>
              <p className="text-xs opacity-90 mt-0.5">
                Both parties have digitally countersigned all terms. Order has been generated and milestone fulfillment is active.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/buyer/orders/ord-801')}
            className="shrink-0 text-xs"
          >
            View Live Milestone
          </Button>
        </div>
      )}

      {/* Trust & Verification Header Callout */}
      <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] flex items-center justify-between text-xs text-[#66645E] dark:text-[#A6A39A]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#365C63]" />
          <span>Platform Verification ID: <strong className="font-mono text-[#252525] dark:text-[#FFFDF7]">{agreement.id}</strong></span>
        </div>
        <span className="font-mono">Created on {agreement.createdAt}</span>
      </div>

      {/* DOCUMENT CANVAS: High-trust editorial layout */}
      <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-8 sm:p-12 shadow-sm space-y-8 font-sans">
        {/* Document Header */}
        <div className="border-b border-[#D2CEC2] dark:border-[#3C4743] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A37B52] dark:text-[#C2AB8E] font-bold block mb-1">
              CONTRACT OF SALE & FULFILLMENT
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Need2Deal Platform Master Trade Terms
            </h2>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1">
              Governed by Need2Deal Commercial Arbitration Guidelines
            </p>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="text-[#66645E] block text-[10px]">FIXED SETTLEMENT AMOUNT</span>
            <span className="text-2xl font-bold text-[#365C63] dark:text-[#8BAAB8]">
              ₹{agreement.agreedPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Counterparties Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Buyer Entity */}
          <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] border border-[#D2CEC2]/70 dark:border-[#3C4743] space-y-2">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A] text-[10px]">
              <Building className="h-3.5 w-3.5" /> Buyer Entity
            </div>
            <strong className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] block">
              {agreement.buyerOrg}
            </strong>
            <p className="text-[#66645E] dark:text-[#A6A39A]">Representative: {agreement.buyerName}</p>
            <p className="text-[#66645E] dark:text-[#A6A39A]">Email: {agreement.buyerEmail}</p>
            <div className="pt-2 border-t border-[#D2CEC2]/50 flex items-center justify-between text-[11px]">
              <span>Digital Signature:</span>
              <strong className={isBuyerSigned ? 'text-[#365C63]' : 'text-[#9A5C55]'}>
                {isBuyerSigned ? `Signed (${agreement.buyerSignedAt})` : 'Pending Signature'}
              </strong>
            </div>
          </div>

          {/* Provider Entity */}
          <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] border border-[#D2CEC2]/70 dark:border-[#3C4743] space-y-2">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A] text-[10px]">
              <UserCheck className="h-3.5 w-3.5" /> Supplier Entity
            </div>
            <strong className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] block">
              {agreement.providerBusiness}
            </strong>
            <p className="text-[#66645E] dark:text-[#A6A39A]">Representative: {agreement.providerName}</p>
            <p className="text-[#66645E] dark:text-[#A6A39A]">Verified Supplier Status: Tier 1 Active</p>
            <div className="pt-2 border-t border-[#D2CEC2]/50 flex items-center justify-between text-[11px]">
              <span>Digital Signature:</span>
              <strong className={isProviderSigned ? 'text-[#365C63]' : 'text-[#9A5C55]'}>
                {isProviderSigned ? `Signed (${agreement.providerSignedAt})` : 'Pending Signature'}
              </strong>
            </div>
          </div>
        </div>

        {/* Deliverables Scope */}
        <div className="space-y-3 text-xs">
          <h3 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] tracking-tight">
            Schedule 1: Deliverables & Specifications
          </h3>
          <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[#66645E] block text-[10px] uppercase font-mono">Product Item</span>
                <strong className="text-sm text-[#252525] dark:text-[#FFFDF7]">{agreement.productTitle}</strong>
              </div>
              <div className="text-right">
                <span className="text-[#66645E] block text-[10px] uppercase font-mono">Agreed Quantity</span>
                <strong className="text-sm text-[#252525] dark:text-[#FFFDF7]">{agreement.quantity} {agreement.unit}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#D2CEC2]/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#365C63]" />
                <div>
                  <span className="text-[#66645E] block text-[10px]">Strict Delivery Deadline</span>
                  <span className="font-semibold text-[#252525] dark:text-[#FFFDF7]">{agreement.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#365C63]" />
                <div>
                  <span className="text-[#66645E] block text-[10px]">Handover Destination</span>
                  <span className="font-semibold text-[#252525] dark:text-[#FFFDF7]">{agreement.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms of Agreement */}
        <div className="space-y-3 text-xs">
          <h3 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] tracking-tight">
            Schedule 2: Binding Commercial Terms
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
            {agreement.terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ol>
        </div>

        {/* Digital Signature Execution Block */}
        <div className="pt-6 border-t border-[#D2CEC2] dark:border-[#3C4743] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7]">
              Digital Counter-Signatures
            </h3>
            <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">
              Legally authenticated via session timestamp
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Buyer Signature Box */}
            <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] text-xs space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#66645E]">Buyer Signature</span>
              {isBuyerSigned ? (
                <div className="space-y-1">
                  <div className="font-serif italic text-lg text-[#252525] dark:text-[#FFFDF7] font-bold">
                    {agreement.buyerName}
                  </div>
                  <span className="text-[10px] text-[#365C63] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Signed {agreement.buyerSignedAt}
                  </span>
                </div>
              ) : (
                <div className="p-4 text-center border border-dashed border-[#D2CEC2] rounded-lg text-[#66645E]">
                  Awaiting Buyer digital signature
                </div>
              )}
            </div>

            {/* Provider Signature Box */}
            <div className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] text-xs space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#66645E]">Supplier Signature</span>
              {isProviderSigned ? (
                <div className="space-y-1">
                  <div className="font-serif italic text-lg text-[#252525] dark:text-[#FFFDF7] font-bold">
                    {agreement.providerName}
                  </div>
                  <span className="text-[10px] text-[#365C63] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Signed {agreement.providerSignedAt}
                  </span>
                </div>
              ) : (
                <div className="p-4 text-center border border-dashed border-[#D2CEC2] rounded-lg text-[#66645E]">
                  Awaiting Supplier digital signature
                </div>
              )}
            </div>
          </div>

          {/* Interactive Signing Action CTA */}
          {canCurrentRoleSign && (
            <div className="p-5 rounded-xl bg-[#E7EFE5]/60 dark:bg-[#29382B] border border-[#C8DAC4] dark:border-[#374C3A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-[#3D5A38] dark:text-[#8BAAB8] block">
                  Action Required: Digitally Sign as {role === 'buyer' ? 'Buyer' : 'Supplier'}
                </strong>
                <p className="text-xs text-[#252525]/80 dark:text-[#EDE9E1]/80 mt-0.5">
                  By clicking confirm, you acknowledge the deliverables, price of ₹{agreement.agreedPrice.toLocaleString()}, and delivery cutoff.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                isLoading={isSigning}
                onClick={handleSign}
                className="shrink-0 gap-2 shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4" /> Confirm & Execute Agreement
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
