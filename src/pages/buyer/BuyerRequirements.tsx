import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Copy,
  Trash2,
  ExternalLink,
  Archive,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Requirement } from '../../data/mockData';

export function BuyerRequirements() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';

  const { requirements, deleteRequirement, addRequirement, updateRequirement } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft' | 'completed' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'deadline' | 'budget' | 'offers'>('deadline');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Filter & sort
  const filteredRequirements = useMemo(() => {
    return requirements.filter((r) => {
      // Tab filter
      if (activeTab === 'active' && r.status !== 'active' && r.status !== 'in_negotiation') return false;
      if (activeTab === 'draft' && r.status !== 'draft') return false;
      if (activeTab === 'completed' && r.status !== 'ordered' && r.status !== 'completed') return false;
      if (activeTab === 'closed' && r.status !== 'closed') return false;

      // Category filter
      if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline);
      if (sortBy === 'budget') return b.budget - a.budget;
      if (sortBy === 'offers') return b.offersCount - a.offersCount;
      return 0;
    });
  }, [requirements, activeTab, selectedCategory, searchQuery, sortBy]);

  const handleDuplicate = (req: Requirement) => {
    const duplicated = addRequirement({
      title: `${req.title} (Copy)`,
      category: req.category,
      quantity: req.quantity,
      unit: req.unit,
      budget: req.budget,
      deadline: req.deadline,
      location: req.location,
      description: req.description,
      preferences: req.preferences,
      status: 'draft'
    });
    setMenuOpenId(null);
    navigate(`/buyer/requirements/${duplicated.id}`);
  };

  const handleCloseRequirement = (id: string) => {
    updateRequirement(id, { status: 'closed' });
    setMenuOpenId(null);
  };

  const handleDelete = (id: string) => {
    deleteRequirement(id);
    setMenuOpenId(null);
  };

  const categoriesList = ['All', 'Apparel', 'Electronics', 'Print & Packaging', 'Event Services', 'Custom Fabrication', 'Bulk Supplies'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Procurement Requirements
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Post, manage, and evaluate supplier proposals for your active demands.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/buyer/requirements/new')}
          className="gap-2 shrink-0 shadow-sm"
        >
          <Plus className="h-4 w-4" /> Post New Requirement
        </Button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1 border-b border-[#D2CEC2] dark:border-[#3C4743] pb-px overflow-x-auto">
        {[
          { key: 'all', label: 'All Demands', count: requirements.length },
          { key: 'active', label: 'Active & In Negotiation', count: requirements.filter((r) => r.status === 'active' || r.status === 'in_negotiation').length },
          { key: 'draft', label: 'Drafts', count: requirements.filter((r) => r.status === 'draft').length },
          { key: 'completed', label: 'Ordered / Completed', count: requirements.filter((r) => r.status === 'ordered' || r.status === 'completed').length },
          { key: 'closed', label: 'Closed', count: requirements.filter((r) => r.status === 'closed').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === tab.key
                ? 'border-[#252525] dark:border-[#FFFDF7] text-[#252525] dark:text-[#FFFDF7]'
                : 'border-transparent text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters & Search Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search requirements by keyword or spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none focus:ring-1 focus:ring-[#365C63]"
            >
              {categoriesList.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66645E] dark:text-[#A6A39A]">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5 text-xs text-[#252525] dark:text-[#EDE9E1] focus:outline-none focus:ring-1 focus:ring-[#365C63]"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="budget">Sort by Budget (High-Low)</option>
              <option value="offers">Sort by Offers Received</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requirements List Table / Rows */}
      {filteredRequirements.length > 0 ? (
        <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden">
          <div className="divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
            {filteredRequirements.map((req) => (
              <div
                key={req.id}
                className="p-5 hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors relative flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div
                  onClick={() => navigate(`/buyer/requirements/${req.id}`)}
                  className="flex-1 cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#66645E] dark:text-[#A6A39A] uppercase font-bold">
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
                          : req.status === 'draft'
                          ? 'neutral'
                          : 'outline'
                      }
                    >
                      {req.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs font-semibold text-[#A37B52] dark:text-[#C2AB8E]">
                      {req.category}
                    </span>
                    <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">
                      • Updated {req.lastUpdated}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                    {req.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-6 text-xs text-[#66645E] dark:text-[#A6A39A]">
                    <span>Budget: <strong className="text-[#252525] dark:text-[#FFFDF7]">₹{req.budget.toLocaleString()}</strong></span>
                    <span>Quantity: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.quantity} {req.unit}</strong></span>
                    <span>Delivery Target: <strong className="text-[#252525] dark:text-[#FFFDF7]">{req.deadline}</strong></span>
                    <span>Location: <span className="text-[#252525] dark:text-[#FFFDF7]">{req.location.split(',')[0]}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div
                    onClick={() => navigate(`/buyer/requirements/${req.id}`)}
                    className="text-right cursor-pointer mr-2"
                  >
                    <span className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] block">
                      {req.offersCount} {req.offersCount === 1 ? 'Offer' : 'Offers'}
                    </span>
                    <span className="text-[11px] text-[#365C63] font-medium">
                      {req.offersCount > 0 ? 'Click to compare' : 'Waiting for bids'}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/buyer/requirements/${req.id}`)}
                    className="h-8.5 text-xs gap-1"
                  >
                    Compare <ChevronRight className="h-3 w-3" />
                  </Button>

                  {/* Context menu for Duplicate, Close, Delete */}
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === req.id ? null : req.id)}
                      className="p-1.5 rounded-md text-[#66645E] hover:bg-[#EAE6DA] dark:hover:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] cursor-pointer"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {menuOpenId === req.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-lg z-20 py-1 text-xs">
                        <button
                          onClick={() => handleDuplicate(req)}
                          className="w-full px-3 py-2 text-left hover:bg-[#EAE6DA] dark:hover:bg-[#232826] flex items-center gap-2 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" /> Duplicate
                        </button>
                        {req.status !== 'closed' && (
                          <button
                            onClick={() => handleCloseRequirement(req.id)}
                            className="w-full px-3 py-2 text-left hover:bg-[#EAE6DA] dark:hover:bg-[#232826] flex items-center gap-2 text-[#A37B52] cursor-pointer"
                          >
                            <Archive className="h-3.5 w-3.5" /> Close Requirement
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="w-full px-3 py-2 text-left hover:bg-[#F7E9E7] dark:hover:bg-[#3E2725] flex items-center gap-2 text-[#9A5C55] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-xl border border-dashed border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] text-center space-y-3">
          <div className="h-10 w-10 rounded-full bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E] mx-auto flex items-center justify-center">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
            No requirements match this filter
          </h3>
          <p className="text-xs text-[#66645E] dark:text-[#A6A39A] max-w-sm mx-auto">
            Try adjusting your search terms or post a new procurement requirement.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/buyer/requirements/new')}
            className="mt-2"
          >
            Post Requirement
          </Button>
        </div>
      )}
    </div>
  );
}
