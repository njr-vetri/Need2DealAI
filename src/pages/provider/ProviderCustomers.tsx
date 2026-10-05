import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Building, Mail, Phone, ExternalLink, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderCustomers() {
  const navigate = useNavigate();
  const { customers } = useMarketplace();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      c.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Collegiate & Institutional Clients
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Directory of repeat buyers, active trade agreements, and historical transaction volume.
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search clients by representative or university..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#EAE6DA] dark:bg-[#232826] border-b border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A]">
            <tr>
              <th className="p-4 font-bold">Client Organization</th>
              <th className="p-4 font-bold">Representative</th>
              <th className="p-4 font-bold">Contact Email</th>
              <th className="p-4 font-bold">Total Procurement Volume</th>
              <th className="p-4 font-bold">Fulfilled Orders</th>
              <th className="p-4 font-bold">Active Contracts</th>
              <th className="p-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#EAE6DA]/40 dark:hover:bg-[#232826] transition-colors">
                <td className="p-4 font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {c.organization}
                </td>
                <td className="p-4 text-[#66645E] dark:text-[#A6A39A]">
                  {c.buyerName}
                </td>
                <td className="p-4 font-mono text-[11px] text-[#365C63]">
                  {c.email}
                </td>
                <td className="p-4 font-mono font-bold text-sm text-[#252525] dark:text-[#FFFDF7]">
                  ₹{c.totalSpent.toLocaleString()}
                </td>
                <td className="p-4">
                  <Badge variant="outline">{c.ordersCount} Completed</Badge>
                </td>
                <td className="p-4">
                  <Badge variant="success">{c.activeAgreementsCount} Active</Badge>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/provider/messages')}
                    className="h-8 text-xs gap-1"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
