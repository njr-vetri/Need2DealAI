import React, { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function ProviderSettings() {
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [bidShortlistAlerts, setBidShortlistAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Supplier Notification Rules & Capacity
        </h1>
        <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
          Configure which category leads match your machinery and auto-notify your sales team.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Preferences saved!
        </div>
      )}

      <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 space-y-6 text-xs">
        <label className="flex items-center justify-between p-3.5 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] cursor-pointer">
          <div>
            <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Instant New Match Pings</strong>
            <span className="text-[#66645E] dark:text-[#A6A39A]">Notify when an Apparel requirement within 150km of Chennai is published.</span>
          </div>
          <input
            type="checkbox"
            checked={leadAlerts}
            onChange={(e) => setLeadAlerts(e.target.checked)}
            className="h-4 w-4 rounded text-[#252525] focus:ring-[#365C63]"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] cursor-pointer">
          <div>
            <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Proposal Shortlist & Acceptance Alerts</strong>
            <span className="text-[#66645E] dark:text-[#A6A39A]">Receive immediate high-priority notice when a buyer selects your quotation.</span>
          </div>
          <input
            type="checkbox"
            checked={bidShortlistAlerts}
            onChange={(e) => setBidShortlistAlerts(e.target.checked)}
            className="h-4 w-4 rounded text-[#252525] focus:ring-[#365C63]"
          />
        </label>

        <div className="flex justify-end pt-4 border-t border-[#D2CEC2]/60">
          <Button variant="primary" size="md" onClick={handleSave}>
            Save Supplier Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
