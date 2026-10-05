import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Star,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Filter,
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Provider } from '../../data/mockData';

export function BuyerProviders() {
  const navigate = useNavigate();
  const { providers, sendMessage } = useMarketplace();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minReliability, setMinReliability] = useState<number>(85);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Enquiry modal
  const [enquiryModalProvider, setEnquiryModalProvider] = useState<Provider | null>(null);
  const [directMsg, setDirectMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const categories = ['All', 'Apparel', 'Print & Packaging', 'Electronics', 'Event Services', 'Custom Fabrication'];

  const filteredProviders = providers.filter((p) => {
    if (selectedCategory !== 'All' && !p.categories.includes(selectedCategory)) return false;
    if (p.reliability < minReliability) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSendDirectEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMsg.trim() || !enquiryModalProvider) return;

    sendMessage(directMsg, undefined, undefined, 'buyer');
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setEnquiryModalProvider(null);
      setDirectMsg('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Verified Suppliers & Makers
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Pre-vetted manufacturing workshops, printers, and hardware assemblers ready for direct bidding.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/buyer/requirements/new')}
        >
          Post a Requirement
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search suppliers by name, capability, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Category selection */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Specialties' : c}</option>
              ))}
            </select>
          </div>

          {/* Reliability minimum */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
            <span>Min Reliability:</span>
            <select
              value={minReliability}
              onChange={(e) => setMinReliability(Number(e.target.value))}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none"
            >
              <option value={85}>85%+</option>
              <option value={90}>90%+</option>
              <option value={95}>95%+ Top Tier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Verified Supplier Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 shadow-xs flex flex-col justify-between hover:border-[#365C63] transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                      {provider.businessName}
                    </h3>
                    {provider.verified && (
                      <span title="Verified Supplier">
                        <ShieldCheck className="h-4 w-4 text-[#365C63] dark:text-[#8BAAB8]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#66645E] dark:text-[#A6A39A] flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {provider.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFFDF7] dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
                  <Star className="h-3.5 w-3.5 fill-[#A37B52] text-[#A37B52]" />
                  <span>{provider.rating}</span>
                </div>
              </div>

              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed line-clamp-3">
                {provider.description}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-1.5">
                {provider.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#EAE6DA]/60 dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Strip & Action */}
            <div className="pt-4 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#66645E] block uppercase">Reliability</span>
                  <strong className="text-[#365C63] dark:text-[#8BAAB8] font-bold">{provider.reliability}%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#66645E] block uppercase">Orders</span>
                  <strong className="text-[#252525] dark:text-[#FFFDF7]">{provider.completedOrders}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#66645E] block uppercase">Lead Time</span>
                  <strong className="text-[#252525] dark:text-[#FFFDF7] text-[11px]">{provider.typicalDelivery}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEnquiryModalProvider(provider)}
                  className="flex-1 text-xs gap-1.5 h-8.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Enquire
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedProvider(provider)}
                  className="flex-1 text-xs h-8.5 shadow-xs"
                >
                  Full Profile
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Provider Detail Modal */}
      {selectedProvider && (
        <Modal
          isOpen={!!selectedProvider}
          onClose={() => setSelectedProvider(null)}
          title={selectedProvider.businessName}
          description={`Verified Maker • ${selectedProvider.location}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-sm text-[#252525] dark:text-[#EDE9E1] leading-relaxed">
              {selectedProvider.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826]">
              <div>
                <span className="text-[#66645E]">Completed Orders:</span>
                <strong className="block text-sm">{selectedProvider.completedOrders}</strong>
              </div>
              <div>
                <span className="text-[#66645E]">Response Rate:</span>
                <strong className="block text-sm text-[#365C63]">{selectedProvider.responseRate}%</strong>
              </div>
              <div>
                <span className="text-[#66645E]">Contact Email:</span>
                <strong className="block">{selectedProvider.contactEmail}</strong>
              </div>
              <div>
                <span className="text-[#66645E]">Contact Phone:</span>
                <strong className="block">{selectedProvider.phone}</strong>
              </div>
            </div>

            <div>
              <strong className="block mb-1.5 text-xs uppercase tracking-wide">Key Capabilities & Machinery:</strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvider.services.map((srv) => (
                  <Badge key={srv} variant="accent">{srv}</Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#D2CEC2]/60">
              <Button variant="ghost" size="sm" onClick={() => setSelectedProvider(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const target = selectedProvider;
                  setSelectedProvider(null);
                  setEnquiryModalProvider(target);
                }}
              >
                Send Direct RFQ / Enquiry
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Enquiry Modal */}
      {enquiryModalProvider && (
        <Modal
          isOpen={!!enquiryModalProvider}
          onClose={() => setEnquiryModalProvider(null)}
          title={`Enquire with ${enquiryModalProvider.businessName}`}
          description="Send an upfront capability query or preliminary pricing request."
        >
          {sentSuccess ? (
            <div className="p-6 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-[#365C63] mx-auto" />
              <h4 className="font-bold text-sm">Message Sent Successfully</h4>
              <p className="text-xs text-[#66645E]">The supplier will reply in your Need2Deal messages inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSendDirectEnquiry} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold">Your Message / Custom Requirement Inquiry</label>
                <textarea
                  rows={4}
                  value={directMsg}
                  onChange={(e) => setDirectMsg(e.target.value)}
                  placeholder="e.g. Do you have capacity to print 800 hoodies for delivery by next Friday in Chennai?"
                  required
                  className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setEnquiryModalProvider(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Send Enquiry
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
