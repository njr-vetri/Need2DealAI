import React, { useState } from 'react';
import { User, Building, MapPin, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function BuyerProfile() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Aditya Swaminathan');
  const [org, setOrg] = useState('Anna University Student Directorate / Tech Symposium');
  const [email, setEmail] = useState('aditya.techfest@annauniv.edu');
  const [phone, setPhone] = useState('+91 98401 23940');
  const [location, setLocation] = useState('Guindy Campus, Chennai, Tamil Nadu');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Buyer Profile & Procurement Credentials
        </h1>
        <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
          Your organization identity attached to published requirements and signed agreements.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
          <div className="h-14 w-14 rounded-full bg-[#252525] text-[#FFFDF7] flex items-center justify-center font-bold text-lg">
            AS
          </div>
          <div>
            <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">{name}</h3>
            <span className="text-xs text-[#365C63] font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Institutional Verified Lead
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Representative Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Organization / College Directorate"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            leftIcon={<Building className="h-4 w-4" />}
            required
          />
          <Input
            label="Official Contact Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
          <Input
            label="Contact Mobile / WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Campus Delivery & Billing Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              leftIcon={<MapPin className="h-4 w-4" />}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#D2CEC2]/60">
          <Button type="submit" variant="primary" size="md">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
