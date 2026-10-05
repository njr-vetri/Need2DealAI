import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Building, MapPin, Mail, Phone, Wrench } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ProviderProfile() {
  const [saved, setSaved] = useState(false);
  const [businessName, setBusinessName] = useState('Chennai PrintWorks');
  const [repName, setRepName] = useState('Ramanathan K.');
  const [email, setEmail] = useState('orders@chennaiprintworks.in');
  const [phone, setPhone] = useState('+91 94440 18239');
  const [location, setLocation] = useState('Guindy Industrial Estate, Chennai, Tamil Nadu');
  const [description, setDescription] = useState(
    'Specialized in bulk screen printing, direct-to-garment apparel, promotional merchandise, and sustainable packaging for student fests and enterprises.'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Supplier Business Profile & Certifications
        </h1>
        <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
          Public profile visible to procurement buyers across collegiate symposia and enterprises.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Workshop details updated!
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
          <div className="h-14 w-14 rounded-full bg-[#A37B52] text-[#FFFDF7] flex items-center justify-center font-bold text-lg">
            CP
          </div>
          <div>
            <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">{businessName}</h3>
            <span className="text-xs text-[#365C63] font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Tier 1 Verified Manufacturer • 96% Reliability
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Business / Registered Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          <Input
            label="Authorized Representative"
            value={repName}
            onChange={(e) => setRepName(e.target.value)}
            required
          />
          <Input
            label="Dispatch Contact Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
          <Input
            label="Direct Phone / WhatsApp Line"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Manufacturing Unit & Delivery Depot"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              leftIcon={<MapPin className="h-4 w-4" />}
              required
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
              Public Machinery & Capacity Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#D2CEC2]/60">
          <Button type="submit" variant="primary" size="md">
            Save Workshop Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
