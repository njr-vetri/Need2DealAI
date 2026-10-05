import React, { useState } from 'react';
import { Settings, Bell, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function BuyerSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoReminder, setAutoReminder] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Workspace Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
          Notification channels, SLA threshold triggers, and contract defaults.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Preferences saved!
        </div>
      )}

      <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7] mb-4">
            Notification Dispatches
          </h3>
          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] cursor-pointer">
              <div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">Instant Email upon New Proposal</strong>
                <span className="text-[#66645E] dark:text-[#A6A39A]">Get pinged immediately when a supplier submits a quote on an active requirement.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded text-[#252525] focus:ring-[#365C63]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] cursor-pointer">
              <div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">SLA Warning 48h Prior to Deadline</strong>
                <span className="text-[#66645E] dark:text-[#A6A39A]">Alert both yourself and supplier when delivery cutoff is within 48 hours.</span>
              </div>
              <input
                type="checkbox"
                checked={autoReminder}
                onChange={(e) => setAutoReminder(e.target.checked)}
                className="h-4 w-4 rounded text-[#252525] focus:ring-[#365C63]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] cursor-pointer">
              <div>
                <strong className="block text-[#252525] dark:text-[#FFFDF7]">SMS Milestone Alerts</strong>
                <span className="text-[#66645E] dark:text-[#A6A39A]">Direct SMS update on dispatch and out-for-delivery milestones.</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="h-4 w-4 rounded text-[#252525] focus:ring-[#365C63]"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-[#D2CEC2]/60 flex justify-end">
          <Button variant="primary" size="md" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
