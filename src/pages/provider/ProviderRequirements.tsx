import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderRequirements() {
  const navigate = useNavigate();
  const { requirements } = useMarketplace();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [maxBudget, setMaxBudget] = useState<number>(200000);

  const categories = ['All', 'Apparel', 'Print & Packaging', 'Electronics', 'Event Services', 'Custom Fabrication', 'Bulk Supplies'];

  const filtered = requirements.filter((r) => {
    if (r.status !== 'active' && r.status !== 'in_negotiation') return false;
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (r.budget > maxBudget) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.buyerOrg.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Discover Open Demands
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Verified institutional requests looking for manufacturing bids, print runs, and custom deliverables.
          </p>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search open buyer demands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E]">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E]">
            <span>Budget Up To:</span>
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none"
            >
              <option value={50000}>₹50,000</option>
              <option value={100000}>₹1,00,000</option>
              <option value={200000}>₹2,00,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Demands List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs hover:border-[#365C63] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#66645E] uppercase">{req.id}</span>
                  <Badge variant="accent">{req.category}</Badge>
                  <span className="text-xs text-[#365C63] font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> 94% Match Score
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {req.title}
                </h3>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] max-w-2xl leading-relaxed">
                  {req.description}
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-mono text-[#66645E] block">Buyer Budget Cap</span>
                <span className="text-xl font-bold font-mono text-[#365C63] dark:text-[#8BAAB8]">
                  ₹{req.budget.toLocaleString()}
                </span>
                <span className="text-xs text-[#66645E] block mt-0.5">
                  {req.offersCount} Bids Submitted
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#D2CEC2]/50 text-xs">
              <div className="flex flex-wrap items-center gap-y-1 gap-x-6 text-[#66645E] dark:text-[#A6A39A]">
                <span>Buyer: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.buyerOrg}</strong></span>
                <span>Quantity: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.quantity} {req.unit}</strong></span>
                <span>Deadline: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.deadline}</strong></span>
                <span>Location: <span className="text-[#252525] dark:text-[#FFFDF7]">{req.location.split(',')[0]}</span></span>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(`/provider/requirements/${req.id}/offer`)}
                className="gap-1.5 text-xs shadow-xs"
              >
                Submit Quotation <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
