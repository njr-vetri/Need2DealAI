import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Building,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setRole } = useMarketplace();

  const initialRoleParam = searchParams.get('role');
  const [role, setLocalRole] = useState<'buyer' | 'provider'>(
    initialRoleParam === 'provider' ? 'provider' : 'buyer'
  );

  const [step, setStep] = useState<1 | 2>(1);

  // Common fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Chennai, Tamil Nadu');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Buyer specific
  const [organization, setOrganization] = useState('');

  // Provider specific
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [description, setDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Password strength calculator
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Empty', score: 0, color: 'bg-gray-300' };
    if (pwd.length < 6) return { label: 'Weak', score: 1, color: 'bg-[#9A5C55]' };
    const hasNum = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    if (pwd.length >= 8 && hasNum && hasSpecial) {
      return { label: 'Strong', score: 3, color: 'bg-[#365C63]' };
    }
    return { label: 'Medium', score: 2, color: 'bg-[#A37B52]' };
  };

  const pwdStrength = getPasswordStrength(password);

  const handleCompleteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please provide your full legal or contact name.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the terms of trade to proceed.');
      return;
    }

    if (role === 'provider' && !businessName.trim()) {
      setError('Please enter your registered workshop or business name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setRole(role);
      setSuccess(`Account registered as ${role === 'buyer' ? 'Procurement Buyer' : 'Verified Supplier'}!`);

      setTimeout(() => {
        if (role === 'buyer') {
          navigate('/buyer');
        } else {
          navigate('/provider');
        }
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] shadow-sm overflow-hidden p-6 sm:p-8">
        {/* Header & Step progress */}
        <div className="flex items-center justify-between pb-6 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Join Need2Deal
            </h2>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-0.5">
              The reverse-procurement platform connecting demand to direct makers.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#365C63] dark:text-[#8BAAB8]">
            <span>Step {step} of 2</span>
          </div>
        </div>

        {/* Feedback Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[#F7E9E7] dark:bg-[#3E2725] border border-[#ECCAC7] dark:border-[#583330] flex items-center gap-2 text-xs font-medium text-[#824A44] dark:text-[#F1B2AD]">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 rounded-lg bg-[#E7EFE5] dark:bg-[#29382B] border border-[#C8DAC4] dark:border-[#374C3A] flex items-center gap-2 text-xs font-semibold text-[#3D5A38] dark:text-[#8BAAB8]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* STEP 1: How will you use Need2Deal? */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] block mb-1">
                How will you use Need2Deal?
              </label>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">
                Choose your primary role. You can switch workspace modes at any time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buyer Card */}
              <div
                onClick={() => setLocalRole('buyer')}
                className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  role === 'buyer'
                    ? 'border-[#252525] dark:border-[#FFFDF7] bg-[#EAE6DA]/70 dark:bg-[#232826] ring-2 ring-[#365C63]/30'
                    : 'border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] hover:bg-[#EAE6DA]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#252525] text-[#FFFDF7] flex items-center justify-center">
                      <Search className="h-5 w-5" />
                    </div>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      role === 'buyer' ? 'border-[#252525] bg-[#252525]' : 'border-[#D2CEC2]'
                    }`}>
                      {role === 'buyer' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                    I am a Buyer
                  </h3>
                  <p className="text-xs text-[#365C63] dark:text-[#8BAAB8] font-medium mt-0.5">
                    &ldquo;I need products or services.&rdquo;
                  </p>
                  <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-3 leading-relaxed">
                    Colleges, event teams, campus clubs, and procurement offices posting demands and evaluating supplier bids.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D2CEC2]/50 text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                  Post demands • Compare bids • Milestone tracking
                </div>
              </div>

              {/* Provider Card */}
              <div
                onClick={() => setLocalRole('provider')}
                className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  role === 'provider'
                    ? 'border-[#252525] dark:border-[#FFFDF7] bg-[#EAE6DA]/70 dark:bg-[#232826] ring-2 ring-[#365C63]/30'
                    : 'border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] hover:bg-[#EAE6DA]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#A37B52] text-[#FFFDF7] flex items-center justify-center">
                      <Package className="h-5 w-5" />
                    </div>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      role === 'provider' ? 'border-[#252525] bg-[#252525]' : 'border-[#D2CEC2]'
                    }`}>
                      {role === 'provider' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                    I am a Supplier
                  </h3>
                  <p className="text-xs text-[#A37B52] dark:text-[#C2AB8E] font-medium mt-0.5">
                    &ldquo;I provide products or services.&rdquo;
                  </p>
                  <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-3 leading-relaxed">
                    Printers, apparel stitchers, electronics assemblers, and AV staging contractors bidding on verified requirements.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D2CEC2]/50 text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                  Receive high-intent leads • Locked agreements
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(2)}
                className="gap-2"
              >
                Continue as {role === 'buyer' ? 'Buyer' : 'Supplier'} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Role Specific Registration Form */}
        {step === 2 && (
          <form onSubmit={handleCompleteSignup} className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-[#365C63] dark:text-[#8BAAB8] uppercase tracking-wide">
                Configuring {role === 'buyer' ? 'Buyer Profile' : 'Supplier Profile'}
              </span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#66645E] hover:text-[#252525] dark:hover:text-[#FFFDF7] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" /> Change role
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Aditya"
                required
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Swaminathan"
                required
              />
            </div>

            {/* Buyer Specific Fields */}
            {role === 'buyer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Organization / College Name"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Anna University Symposium Committee"
                  leftIcon={<Building className="h-4 w-4" />}
                />
                <Input
                  label="Delivery Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Chennai, Tamil Nadu"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  required
                />
              </div>
            )}

            {/* Provider Specific Fields */}
            {role === 'provider' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Business / Workshop Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Chennai PrintWorks"
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
                      Primary Specialization Category <span className="text-[#9A5C55]">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-10 w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 py-2 text-sm text-[#252525] dark:text-[#EDE9E1] focus:outline-none focus:ring-2 focus:ring-[#365C63]"
                    >
                      <option value="Apparel">Apparel & Merchandise</option>
                      <option value="Print & Packaging">Print & Packaging</option>
                      <option value="Electronics">Electronics & Hardware</option>
                      <option value="Event Services">Event Services & AV</option>
                      <option value="Custom Fabrication">Custom Fabrication</option>
                      <option value="Bulk Supplies">Bulk Supplies</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Operating Workshop Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Guindy Industrial Estate, Chennai"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
                    Short Business & Machinery Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. 6-color automatic screen printing press with 1,500 pcs daily capacity. Bio-wash cotton specialists."
                    className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-sm text-[#252525] dark:text-[#EDE9E1] placeholder-[#66645E]/60 focus:outline-none focus:ring-2 focus:ring-[#365C63]"
                  />
                </div>
              </>
            )}

            <Input
              label="Work or Official Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              required
            />

            <div>
              <Input
                label="Create Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
              {/* Password strength meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                    <span>Password Strength: <strong>{pwdStrength.label}</strong></span>
                  </div>
                  <div className="h-1.5 w-full bg-[#EAE6DA] dark:bg-[#232826] rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${pwdStrength.color} transition-all duration-300`}
                      style={{ width: `${(pwdStrength.score / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#66645E] dark:text-[#A6A39A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#D2CEC2] text-[#252525] focus:ring-[#365C63] mt-0.5"
                />
                <span>
                  I agree to Need2Deal&apos;s Terms of Trade, Digital Mutual Agreement Protocols, and Privacy Guidelines.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="gap-2"
              >
                Create Account & Launch <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-[#66645E] dark:text-[#A6A39A] mt-6 pt-4 border-t border-[#D2CEC2]/40">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#252525] dark:text-[#FFFDF7] hover:text-[#365C63] underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
