import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Archive, Search, Download, Filter, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function BuyerRecords() {
  const navigate = useNavigate();
  const { requirements, agreements, orders } = useMarketplace();
  const [recordType, setRecordType] = useState<'all' | 'agreements' | 'orders' | 'demands'>('all');
  const [search, setSearch] = useState('');

  const recordsList = [
    ...agreements.map((a) => ({
      id: a.id,
      title: a.productTitle,
      type: 'Agreement',
      counterparty: a.providerBusiness,
      amount: a.agreedPrice,
      status: a.status,
      date: a.createdAt,
      link: `/buyer/agreements/${a.id}`
    })),
    ...orders.map((o) => ({
      id: o.id,
      title: o.title,
      type: 'Order',
      counterparty: o.providerName,
      amount: o.agreedPrice,
      status: o.status,
      date: o.deliveryDate,
      link: `/buyer/orders/${o.id}`
    })),
    ...requirements.map((r) => ({
      id: r.id,
      title: r.title,
      type: 'Requirement',
      counterparty: `${r.offersCount} Bidders`,
      amount: r.budget,
      status: r.status,
      date: r.postedAt,
      link: `/buyer/requirements/${r.id}`
    }))
  ];

  const filtered = recordsList.filter((rec) => {
    if (recordType === 'agreements' && rec.type !== 'Agreement') return false;
    if (recordType === 'orders' && rec.type !== 'Order') return false;
    if (recordType === 'demands' && rec.type !== 'Requirement') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        rec.title.toLowerCase().includes(q) ||
        rec.id.toLowerCase().includes(q) ||
        rec.counterparty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Procurement Ledger & Audit Records
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Immutable transaction records, signed agreements, and financial audit logs for your institutional reconciliation.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-1.5 text-xs"
        >
          <Download className="h-3.5 w-3.5" /> Export Audit Log
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search records by ID, party, or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'agreements', 'orders', 'demands'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRecordType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
                recordType === t
                  ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525]'
                  : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#66645E]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table view */}
      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#EAE6DA] dark:bg-[#232826] border-b border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A]">
            <tr>
              <th className="p-4 font-bold">Record ID</th>
              <th className="p-4 font-bold">Type</th>
              <th className="p-4 font-bold">Title / Deliverable</th>
              <th className="p-4 font-bold">Counterparty</th>
              <th className="p-4 font-bold">Value</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate(item.link)}
                className="hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors cursor-pointer"
              >
                <td className="p-4 font-mono font-bold text-[#66645E]">{item.id}</td>
                <td className="p-4">
                  <Badge variant="outline">{item.type}</Badge>
                </td>
                <td className="p-4 font-bold text-[#252525] dark:text-[#FFFDF7] max-w-xs truncate">
                  {item.title}
                </td>
                <td className="p-4 text-[#66645E] dark:text-[#A6A39A]">{item.counterparty}</td>
                <td className="p-4 font-mono font-bold text-[#365C63]">₹{item.amount.toLocaleString()}</td>
                <td className="p-4 capitalize">
                  <Badge variant={item.status.includes('agreed') || item.status.includes('completed') ? 'success' : 'accent'}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <ChevronRight className="h-4 w-4 text-[#66645E] ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
