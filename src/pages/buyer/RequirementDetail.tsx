import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
  Star,
  Send,
  X,
  FileCheck,
  Heart,
  TrendingDown,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Offer } from '../../data/mockData';

export function RequirementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    requirements,
    offers,
    providers,
    shortlistOffer,
    selectOfferAndCreateAgreement,
    messages,
    sendMessage
  } = useMarketplace();

  const req = requirements.find((r) => r.id === id) || requirements[0];
  const reqOffers = offers.filter((o) => o.requirementId === req.id);

  // Active enquiry modal state
  const [selectedOfferForEnquiry, setSelectedOfferForEnquiry] = useState<Offer | null>(null);
  const [enquiryText, setEnquiryText] = useState('Can you verify if the fabric is pre-shrunk combed cotton?');

  // Offer detail modal
  const [inspectedOffer, setInspectedOffer] = useState<Offer | null>(null);

  // Identify standout offers: cheapest, fastest, best overall
  const bestMatchOffer = [...reqOffers].sort((a, b) => b.matchScore - a.matchScore)[0];
  const cheapestOffer = [...reqOffers].sort((a, b) => a.price - b.price)[0];
  const fastestOffer = [...reqOffers].sort((a, b) => a.deliveryDays - b.deliveryDays)[0];

  const handleSelectOffer = (offer: Offer) => {
    const agreement = selectOfferAndCreateAgreement(offer.id);
    if (agreement) {
      navigate(`/buyer/agreements/${agreement.id}`);
    }
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim() || !selectedOfferForEnquiry) return;

    sendMessage(enquiryText, req.id, selectedOfferForEnquiry.id, 'buyer');
    setEnquiryText('');
  };

  // Filter messages for current enquiry thread
  const currentEnquiryMessages = messages.filter(
    (m) => m.requirementId === req.id && (!selectedOfferForEnquiry || m.offerId === selectedOfferForEnquiry.id)
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back button & Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="space-y-2">
          <button
            onClick={() => navigate('/buyer/requirements')}
            className="text-xs font-semibold text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525] dark:hover:text-[#FFFDF7] flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Requirements
          </button>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#66645E] dark:text-[#A6A39A] uppercase">
              {req.id}
            </span>
            <Badge
              variant={
                req.status === 'active'
                  ? 'success'
                  : req.status === 'agreement_pending'
                  ? 'warning'
                  : req.status === 'ordered'
                  ? 'match'
                  : 'neutral'
              }
            >
              {req.status.replace('_', ' ')}
            </Badge>
            <Badge variant="outline">{req.category}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            {req.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] max-w-2xl leading-relaxed">
            {req.description}
          </p>
        </div>

        <div className="flex sm:flex-col items-end gap-2 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-[#66645E] uppercase block">Budget Cap</span>
            <span className="text-xl font-bold text-[#252525] dark:text-[#FFFDF7]">
              ₹{req.budget.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#66645E] uppercase block">Deadline</span>
            <span className="text-xs font-semibold text-[#252525] dark:text-[#FFFDF7]">
              {req.deadline}
            </span>
          </div>
        </div>
      </div>

      {/* Structured Details Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] text-xs">
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Volume Requested</span>
          <strong className="text-sm text-[#252525] dark:text-[#FFFDF7]">{req.quantity} {req.unit}</strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Handover Location</span>
          <strong className="text-sm text-[#252525] dark:text-[#FFFDF7] truncate block">{req.location}</strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Posted Date</span>
          <strong className="text-sm text-[#252525] dark:text-[#FFFDF7]">{req.postedAt}</strong>
        </div>
        <div>
          <span className="text-[#66645E] block text-[10px] uppercase font-mono">Bids In Review</span>
          <strong className="text-sm text-[#365C63] dark:text-[#8BAAB8]">{reqOffers.length} Verified Offers</strong>
        </div>
      </div>

      {/* SECTION: Intelligent Recommendation & Standout Highlights */}
      {reqOffers.length > 0 && (
        <div className="rounded-xl border border-[#C8DAC4] dark:border-[#374C3A] bg-[#E7EFE5]/50 dark:bg-[#29382B]/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#365C63] dark:text-[#8BAAB8]" />
            <h2 className="text-sm font-bold text-[#3D5A38] dark:text-[#8BAAB8] tracking-tight">
              Intelligent Offer Synthesis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Best Overall Match */}
            {bestMatchOffer && (
              <div className="p-3.5 rounded-lg bg-[#FFFDF7] dark:bg-[#252525] border border-[#C8DAC4] dark:border-[#374C3A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="match">Best Overall (96%)</Badge>
                  <span className="font-bold text-sm">₹{bestMatchOffer.price.toLocaleString()}</span>
                </div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">
                  {providers.find((p) => p.id === bestMatchOffer.providerId)?.businessName}
                </strong>
                <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                  Recommended because it meets strict 210 GSM bio-wash specs, delivers 2 days before deadline, and provider holds a 96% track record.
                </p>
              </div>
            )}

            {/* Cheapest Bid */}
            {cheapestOffer && (
              <div className="p-3.5 rounded-lg bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2] dark:border-[#3C4743] space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral">Lowest Price</Badge>
                  <span className="font-bold text-sm text-[#365C63]">₹{cheapestOffer.price.toLocaleString()}</span>
                </div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">
                  {providers.find((p) => p.id === cheapestOffer.providerId)?.businessName}
                </strong>
                <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                  Saves ₹{(req.budget - cheapestOffer.price).toLocaleString()} against budget cap. Standard 190 GSM fabric with 9-day lead time.
                </p>
              </div>
            )}

            {/* Fastest Delivery */}
            {fastestOffer && (
              <div className="p-3.5 rounded-lg bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2] dark:border-[#3C4743] space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="warning">Fastest Delivery</Badge>
                  <span className="font-bold text-sm">{fastestOffer.deliveryDays} Days Lead</span>
                </div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">
                  {providers.find((p) => p.id === fastestOffer.providerId)?.businessName}
                </strong>
                <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                  Express delivery in {fastestOffer.deliveryDays} days with pre-stocked blanks. Quoted at ₹{fastestOffer.price.toLocaleString()}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION: Professional Multi-Column Comparison Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7]">
              Multi-Factor Proposal Matrix ({reqOffers.length} Received)
            </h2>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
              Compare suppliers across price, speed, certified material specs, and risk factors.
            </p>
          </div>
        </div>

        {reqOffers.length > 0 ? (
          <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EAE6DA] dark:bg-[#232826] border-b border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A] whitespace-nowrap">
                <tr>
                  <th className="p-4 font-bold">Supplier</th>
                  <th className="p-4 font-bold">Offer & Specs</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Delivery</th>
                  <th className="p-4 font-bold">Match Score</th>
                  <th className="p-4 font-bold">Reliability</th>
                  <th className="p-4 font-bold">Risk</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
                {reqOffers
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .map((offer) => {
                    const provider = providers.find((p) => p.id === offer.providerId);
                    const isBest = offer.id === bestMatchOffer?.id;

                    return (
                      <tr
                        key={offer.id}
                        className={`transition-colors ${
                          isBest
                            ? 'bg-[#E7EFE5]/30 dark:bg-[#29382B]/20'
                            : 'hover:bg-[#EAE6DA]/30 dark:hover:bg-[#232826]/50'
                        }`}
                      >
                        {/* Supplier */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-[#365C63] shrink-0" />}
                            <div>
                              <strong className="text-sm text-[#252525] dark:text-[#FFFDF7] block">
                                {provider?.businessName}
                              </strong>
                              <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                                {provider?.location.split(',')[0]} • {provider?.rating}★
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Offer Specs */}
                        <td className="p-4 max-w-xs">
                          <p className="line-clamp-2 text-[#252525] dark:text-[#EDE9E1] leading-relaxed">
                            {offer.specs}
                          </p>
                          <button
                            onClick={() => setInspectedOffer(offer)}
                            className="text-[11px] text-[#365C63] dark:text-[#8BAAB8] hover:underline font-semibold mt-0.5 cursor-pointer"
                          >
                            Inspect full terms
                          </button>
                        </td>

                        {/* Price */}
                        <td className="p-4 font-mono font-bold text-sm text-[#252525] dark:text-[#FFFDF7] whitespace-nowrap">
                          ₹{offer.price.toLocaleString()}
                          {offer.price < req.budget && (
                            <span className="block text-[10px] text-[#365C63] font-sans font-medium">
                              -₹{(req.budget - offer.price).toLocaleString()}
                            </span>
                          )}
                        </td>

                        {/* Delivery */}
                        <td className="p-4 whitespace-nowrap">
                          <span className="font-semibold block">{offer.deliveryDays} Days</span>
                          <span className="text-[10px] text-[#66645E]">Direct Handover</span>
                        </td>

                        {/* AI Match */}
                        <td className="p-4 whitespace-nowrap">
                          <Badge variant={offer.matchScore >= 90 ? 'success' : 'warning'}>
                            {offer.matchScore}% Match
                          </Badge>
                        </td>

                        {/* Reliability */}
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 font-semibold text-[#365C63] dark:text-[#8BAAB8]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{provider?.reliability}%</span>
                          </div>
                          <span className="text-[10px] text-[#66645E]">
                            {provider?.completedOrders} Orders
                          </span>
                        </td>

                        {/* Risk Assessment */}
                        <td className="p-4 whitespace-nowrap">
                          <Badge
                            variant={
                              offer.riskAssessment === 'Low Risk'
                                ? 'success'
                                : offer.riskAssessment === 'Moderate Risk'
                                ? 'warning'
                                : 'danger'
                            }
                          >
                            {offer.riskAssessment}
                          </Badge>
                        </td>

                        {/* Action Buttons */}
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Shortlist heart */}
                            <button
                              onClick={() => shortlistOffer(offer.id)}
                              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                                offer.status === 'shortlisted'
                                  ? 'bg-[#9A5C55]/10 border-[#9A5C55] text-[#9A5C55]'
                                  : 'border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] hover:text-[#9A5C55]'
                              }`}
                              title={offer.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist offer'}
                            >
                              <Heart className="h-3.5 w-3.5 fill-current" />
                            </button>

                            {/* Enquiry button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedOfferForEnquiry(offer)}
                              className="h-8 px-2 text-xs gap-1"
                            >
                              <MessageSquare className="h-3.5 w-3.5" /> Enquire
                            </Button>

                            {/* Select offer button -> generates mutual agreement */}
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSelectOffer(offer)}
                              className="h-8 px-3 text-xs shadow-xs"
                            >
                              Select Offer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 rounded-xl border border-dashed border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] text-center space-y-3">
            <Clock className="h-10 w-10 text-[#66645E] mx-auto opacity-40 animate-pulse" />
            <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
              Waiting for Supplier Bids
            </h3>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] max-w-sm mx-auto">
              We have broadcasted this requirement to 12 verified manufacturers in your zone. Bids typically arrive within 2 to 6 hours.
            </p>
          </div>
        )}
      </div>

      {/* CONTEXTUAL ENQUIRY MODAL / DRAWER */}
      {selectedOfferForEnquiry && (
        <Modal
          isOpen={!!selectedOfferForEnquiry}
          onClose={() => setSelectedOfferForEnquiry(null)}
          title={`Enquire on Offer #${selectedOfferForEnquiry.id}`}
          description={`Direct message with ${
            providers.find((p) => p.id === selectedOfferForEnquiry.providerId)?.businessName
          } regarding "${req.title}"`}
        >
          <div className="space-y-4">
            {/* Offer snapshot context banner */}
            <div className="p-3 rounded-lg bg-[#EAE6DA]/50 dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] flex items-center justify-between text-xs">
              <div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">
                  {providers.find((p) => p.id === selectedOfferForEnquiry.providerId)?.businessName}
                </strong>
                <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                  Quote: ₹{selectedOfferForEnquiry.price.toLocaleString()} • {selectedOfferForEnquiry.deliveryDays} Days Turnaround
                </span>
              </div>
              <Badge variant="accent">Context Linked</Badge>
            </div>

            {/* Conversation log */}
            <div className="max-h-60 overflow-y-auto space-y-3 p-3 rounded-lg border border-[#D2CEC2]/60 dark:border-[#3C4743]/60 bg-[#FFFDF7] dark:bg-[#1C201F]">
              {currentEnquiryMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.senderRole === 'buyer' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 text-xs leading-relaxed ${
                      msg.senderRole === 'buyer'
                        ? 'bg-[#252525] text-[#FFFDF7]'
                        : 'bg-[#EAE6DA] dark:bg-[#252525] text-[#252525] dark:text-[#FFFDF7]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#66645E] mt-0.5">
                    {msg.senderName} • {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Enquiry Form */}
            <form onSubmit={handleSendEnquiry} className="flex gap-2">
              <input
                type="text"
                value={enquiryText}
                onChange={(e) => setEnquiryText(e.target.value)}
                placeholder="Ask specific adjustment (e.g. 'Can you provide 220 GSM cotton?')..."
                className="flex-1 h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 text-xs text-[#252525] dark:text-[#FFFDF7] focus:outline-none focus:ring-1 focus:ring-[#365C63]"
              />
              <Button type="submit" variant="primary" size="sm" className="h-9 gap-1">
                <Send className="h-3.5 w-3.5" /> Send
              </Button>
            </form>
          </div>
        </Modal>
      )}

      {/* FULL OFFER SPECIFICATIONS MODAL */}
      {inspectedOffer && (
        <Modal
          isOpen={!!inspectedOffer}
          onClose={() => setInspectedOffer(null)}
          title="Offer Technical Specifications"
          description={`Full proposal breakdown from ${
            providers.find((p) => p.id === inspectedOffer.providerId)?.businessName
          }`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-[#EAE6DA]/50 dark:bg-[#232826] space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Quoted Amount:</span>
                <span className="text-sm font-bold text-[#365C63]">₹{inspectedOffer.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#66645E]">
                <span>Fulfillment Window:</span>
                <span>{inspectedOffer.deliveryDays} Days</span>
              </div>
            </div>

            <div>
              <strong className="block text-[#252525] dark:text-[#FFFDF7] mb-1">Materials & Production Rider</strong>
              <p className="p-3 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] leading-relaxed text-[#66645E] dark:text-[#A6A39A]">
                {inspectedOffer.specs}
              </p>
            </div>

            <div>
              <strong className="block text-[#252525] dark:text-[#FFFDF7] mb-1">Warranty & Quality Guarantee</strong>
              <p className="p-3 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] leading-relaxed text-[#66645E] dark:text-[#A6A39A]">
                {inspectedOffer.warranty}
              </p>
            </div>

            <div>
              <strong className="block text-[#252525] dark:text-[#FFFDF7] mb-1">Commercial & Dispatch Terms</strong>
              <p className="p-3 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] leading-relaxed text-[#66645E] dark:text-[#A6A39A]">
                {inspectedOffer.terms}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D2CEC2]/50">
              <Button variant="ghost" size="sm" onClick={() => setInspectedOffer(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const target = inspectedOffer;
                  setInspectedOffer(null);
                  handleSelectOffer(target);
                }}
              >
                Proceed to Mutual Agreement
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
